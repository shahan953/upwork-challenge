import React, { Component } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import Carousel from "nuka-carousel";
import axios from "axios";
import * as _ from "lodash";
import Joi from "joi-browser";
import LoadingOverlay from "react-loading-overlay";
import { carImagesArray, carLogosArray, carAvatar } from "../../assets";

class View extends Component {
    state = {
        carImagesArray,
        carLogosArray,
        selectionSide: "manufacturer",
        formDetails: {
            zipCode: "",
            travelRadius: "",
            financingPreference: ""
        },
        errors: {},
        isOverlayActive: false
    };

    schema = {
        zipCode: Joi.string().required(),
        travelRadius: Joi.string().required(),
        financingPreference: Joi.string().required()
    };

    updateDimensions = () => {
        const reelContainerWidth = window.innerWidth;
        this.setState({ reelContainerWidth });
    };

    async componentDidMount() {
        const {
            data: { makes }
        } = await axios.get("https://www.dealstryker.com/models");
        console.log("response :", makes);
        this.setState({ makes });

        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);

        console.log("state: ", this.state);
    }

    returnImageStatus = index => {
        if (index % 2 === 0) {
            return false;
        }
        return true;
    };

    handleImageSliderCount = () => {
        if (this.state.reelContainerWidth >= 768) {
            return 4;
        }
        return 1;
    };

    handleNestedImageSlider = () => {
        if (this.state.reelContainerWidth >= 768) {
            return 2;
        }
        return 1;
    };

    handleImageSelection = async (image, index) => {
        if (this.state.selectionSide === "manufacturer") {
            let userSelection = Object.keys(this.state.carLogosArray)[index];

            if (userSelection === "Alfa_Romeo") {
                userSelection = "Alfa Romeo";
            } else if (userSelection === "Mercedes_Benz") {
                userSelection = "Mercedes-Benz";
            } else if (userSelection === "Land_Rover") {
                userSelection = "Land Rover";
            }

            let desiredOutput = this.state.makes[userSelection];

            let carsAllData = await this.getCarsUnderManufacturers(
                userSelection,
                Object.keys(desiredOutput)
            );

            let carsData = [];
            for (let carData of carsAllData) {
                if (carData) carsData = [...carsData, carData[0]];
            }

            console.log("data got from method: ", carsData);

            const carModelImages = await this.getCarModelImages(carsData);
            console.log("car images data from method: ", carModelImages);

            this.setState({ isOverlayActive: false });

            this.setState({
                userSelection,
                selectionMade: true,
                desiredOutput,
                carsData,
                carModelImages
            });
        }

        // let imageArr = [...this.state.carImagesArray];

        // for (let [i, item] of imageArr.entries()) {
        //   if (i % 2 !== 0) {
        //     if (item.includes("blue")) {
        //       let x = imageArr[i];
        //       imageArr[i] = imageArr[i - 1];
        //       imageArr[i - 1] = x;
        //       this.setState({ carImagesArray: [...imageArr] });
        //     }
        //   }
        // }

        // let x = imageArr[index];
        // imageArr[index] = imageArr[index - 1];
        // imageArr[index - 1] = x;
        // this.setState(
        //   { carImagesArray: [...imageArr], selectedImageIndex: index },
        //   () => console.log(this.state)
        // );
    };

    getCarsUnderManufacturers = async (carMake, carModels) => {
        this.setState({ isOverlayActive: true });
        let data = [];
        console.log("carModels Array length: ", carModels.length);
        for (let model of carModels) {
            try {
                var { data: details } = await axios.get(
                    `https://api.fuelapi.com/v1/json/vehicles/?year=2019&model=${model}&make=${carMake}&api_key=daefd14b-9f2b-4968-9e4d-9d4bb4af01d1`
                );
            } catch (e) {
                console.log("exception raised in http request");
            }
            data = [...data, details];
        }
        data = _.uniq(data);
        console.log("response from Fuel API:", data);
        return data;
    };

    getCarModelImages = async carsData => {
        let data = [];
        console.log("carsData Array length: ", carsData.length);

        for (let carData of carsData) {
            const { id } = carData;
            try {
                const {
                    data: {
                        trim,
                        model: {
                            name: modelName,
                            make: { name: makeName }
                        },
                        products: [
                            {
                                productFormats: [{ assets }]
                            }
                        ]
                    }
                } = await axios.get(
                    `https://api.fuelapi.com/v1/json/vehicle/${id}/?api_key=daefd14b-9f2b-4968-9e4d-9d4bb4af01d1&productID=1`
                );

                var response = { id, trim, modelName, makeName, assets };
            } catch (e) {
                console.log("exception raised in http request");
            }

            // eslint-disable-next-line array-callback-return
            let assets = response.assets.filter(item => {
                const {
                    shotCode: { code }
                } = item;
                if (code === "046") return item;
            });
            response.assets = assets;
            data = [...data, response];
        }

        data = _.uniq(data);
        return data;
    };

    getCarColorImages = async () => {
        this.setState({ isOverlayActive: true });
        let data = [];
        const colorsArray = this.state.desiredOutput[this.state.selectedModel]
            .exteriorColors;
        console.log("colorsArray: ", colorsArray);
        const { id } = this.state.selectedModelData;

        for (let colorObj of colorsArray) {
            const { color } = colorObj;
            try {
                const {
                    data: {
                        products: [
                            {
                                productFormats: [{ assets }]
                            }
                        ]
                    }
                } = await axios.get(
                    `https://api.fuelapi.com/v1/json/vehicle/${id}/?api_key=daefd14b-9f2b-4968-9e4d-9d4bb4af01d1&productID=2&year=2019&color=${color}`
                );

                var response = { color, assets: assets[0] };
            } catch (e) {
                console.log("exception raised in http request");
            }

            data = [...data, response];
        }

        data = _.uniq(data);
        return data;
    };

    getCarTrimImages = async () => {
        this.setState({ isOverlayActive: true });
        let data = [];
        const trimsArray = this.state.desiredOutput[this.state.selectedModel].trims;
        const { make_name, model_name } = this.state.selectedModelData;

        for (let trim of trimsArray) {
            try {
                var { response } = await axios.get(
                    `https://api.fuelapi.com/v1/json/vehicles/?year=2019&model=${model_name}&make=${make_name}&trim=${trim}&api_key=daefd14b-9f2b-4968-9e4d-9d4bb4af01d1`
                );

                // var response = { color, assets: assets[0] };
            } catch (e) {
                console.log("exception raised in http request");
            }

            data = [...data, response];
        }

        data = _.uniq(data);
        return data;
    };

    // handleSelectionMode = selectionSide => {
    //   console.log("selection clicked: ", selectionSide);
    //   this.setState({ selectionSide }, () => {
    //     console.log("state > selectionside: ", this.state.selectionSide);
    //   });
    // };

    handleModelSelection = async selectedModel => {
        // eslint-disable-next-line array-callback-return
        const selectedModelData = this.state.carsData.find(carData => {
            const { model_name } = carData;
            if (model_name === selectedModel) {
                return carData;
            }
        });


        this.setState({ selectedModel, selectedModelData }, () => {
            if (this.state.selectedModelData) this.callGetColorImagesMethod();
        });
    };

    callGetColorImagesMethod = async () => {
        let carColorImages = await this.getCarColorImages();
        // eslint-disable-next-line array-callback-return
        carColorImages = carColorImages.filter(item => {
            if (item) return item;
        });
        this.setState({ carColorImages, isOverlayActive: false }, () => {
            console.log("this.state.carColorImages: ", this.state.carColorImages);
        });
    };

    handleColorSelection = selectedColor => {
        this.setState({ selectedColor }, () => {
            console.log("state > selectedColor: ", this.state.selectedColor);
            if (this.state.selectedModelData) this.callGetTrimImagesMethod();
        });
    };

    callGetTrimImagesMethod = async () => {
        const carTrimImages = await this.getCarTrimImages();
        this.setState({ carTrimImages, isOverlayActive: false }, () => {
            console.log("this.state.carTrimImages: ", this.state.carTrimImages);
        });
    };

    handleTrimSelection = selectedTrim => {
        this.setState({ selectedTrim }, () => {
            console.log("state > selectedTrim: ", this.state.selectedTrim);
        });
    };

    getModelImgSrc = item => {
        const carModelImages = this.state.carModelImages;

        // eslint-disable-next-line array-callback-return
        const data = carModelImages.find(imgItem => {
            const { modelName } = imgItem;
            if (modelName === item) return item;
        });

        if (data) {
            return data.assets[0].url;
        }
        return carAvatar;
    };

    getColorImgSrc = item => {
        if (this.state.carColorImages && this.state.carColorImages[0]) {
            // eslint-disable-next-line array-callback-return
            const colorData = this.state.carColorImages.find(colorItem => {
                const { color } = colorItem;
                if (color === item) return colorItem;
            });

            if (colorData) {
                return colorData.assets.url;
            }
            console.log("returning url: car avatar");
            return carAvatar;
        }
        console.log("returning url: car avatar");
        return carAvatar;
    };

    getTrimImgSrc = item => {
        if (this.state.carTrimImages && this.state.carTrimImages[0]) {
            console.log(
                "get src trim: ",
                this.state.carTrimImages,
                this.state.carTrimImages.length
            );
            // eslint-disable-next-line array-callback-return
            const trimData = this.state.carTrimImages.find(trimItem => {
                const { trim } = trimItem;
                if (trim === item) return trimItem;
            });

            if (trimData) {
                return trimData.assets.url;
            }
            console.log("returning url: car avatar");
            return carAvatar;
        }
        console.log("returning url: car avatar");
        return carAvatar;
    };

    handleCancelSelection = () => {
        this.setState(
            {
                selectedColor: null,
                selectedImageIndex: null,
                selectedModel: null,
                selectedTrim: null,
                userSelection: null,
                selectionMade: false,
                desiredOutput: null,
                carColorImages: null,
                carModelImages: null
            },
            () => {
                console.log("selections deleted: ", this.state);
            }
        );
    };

    valiate = () => {
        const result = Joi.validate(this.state.formDetails, this.schema, {
            abortEarly: false
        });

        if (!result.error) return null;

        const errors = {};
        for (let item of result.error.details) {
            errors[item.path[0]] = item.message;
        }

        return errors;
    };

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        Joi.validate(obj, schema, { abortEarly: false });
    };

    handleInputChange = e => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(e.currentTarget);
        if (errorMessage) {
            errors[e.currentTarget.name] = errorMessage;
        } else {
            delete errors[e.currentTarget.name];
        }

        console.log(e.currentTarget.name, ":", e.currentTarget.value);
        const formDetails = { ...this.state.formDetails };
        formDetails[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ formDetails, errors });
    };

    handleSubmit = e => {
        e.preventDefault();

        const errors = this.valiate();
        this.setState({ errors: errors || {} }, () => {
            console.log("errors set: ", this.state.errors);
        });

        if (errors) return;

        console.log("Form Submitted Successfully");
    };

    render() {
        console.log("render method called");
        return (
            <div>
                {/* header */}
                <div className="home-section-1" />

                {/* Buying Selection Modes */}
                <LoadingOverlay
                    className="overlay-component"
                    active={this.state.isOverlayActive}
                    spinner
                    text="Fetching Data..."
                />

                <div className="home-section-buying pt-5 pb-5">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 mb-5">
                                <h2 className="align">
                                    The Better Way to Buy a New Vehicle
                </h2>
                            </div>

                            {/* <div className="col-12 mb-5 align">
                <ul>
                  <li
                    onClick={() => this.handleSelectionMode("type")}
                    className={
                      this.state.selectionSide === "type"
                        ? "d-inline-block buying-selection-mode selected-selection-mode"
                        : "d-inline-block buying-selection-mode"
                    }
                  >
                    <i className="fa fa-car d-block" />
                    <span className="buying-selection-mode-text">Type</span>
                  </li>
                  <li
                    onClick={() => this.handleSelectionMode("manufacturer")}
                    className={
                      this.state.selectionSide === "manufacturer"
                        ? "d-inline-block buying-selection-mode second-mode selected-selection-mode"
                        : "d-inline-block buying-selection-mode second-mode"
                    }
                  >
                    <i className="fa fa-wrench d-block" />
                    <span className="buying-selection-mode-text">
                      Manufacturer
                    </span>
                  </li>
                </ul>
              </div> */}

                            {/* cancel selection button */}
                            {this.state.selectionMade && (
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12 d-flex justify-content-end">
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => this.handleCancelSelection()}
                                            >
                                                Remove Selections
                      </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* carousel for type/manufacturers */}
                            {!this.state.selectionMade && (
                                <Carousel
                                    className="mb-5 mt-3"
                                    slidesToShow={4}
                                    renderBottomCenterControls={() => false}
                                    wrapAround={true}
                                >
                                    {this.state.selectionSide === 'type' &&
                                        this.state.carImagesArray.map(
                                            (image, index) =>
                                                this.returnImageStatus(index) && (
                                                    <img
                                                        onClick={() =>
                                                            this.handleImageSelection(image, index)
                                                        }
                                                        className="slider-type-image"
                                                        key={index}
                                                        src={image}
                                                        alt=""
                                                    />
                                                )
                                        )}

                                    {this.state.selectionSide === 'manufacturer' &&
                                        _.values(this.state.carLogosArray).map(
                                            (image, index) => (
                                                <img
                                                    onClick={() =>
                                                        this.handleImageSelection(image, index)
                                                    }
                                                    className="slider-brand-image"
                                                    key={index}
                                                    src={image}
                                                    alt=""
                                                />
                                            )
                                        )}
                                </Carousel>
                            )}
                        </div>
                    </div>
                </div>

                {/* Model Selection Carousel */}
                <div className="container-fluid">
                    {this.state.selectionMade && !this.state.selectedModel && (
                        <div className="row justify-content-center">
                            <div className="col-12 d-flex justify-content-center mb-3">
                                <div className="col-md-3 col-sm-2 align">
                                    <span className="badge badge-primary p-3 mr-3">
                                        {this.state.userSelection}
                                    </span>
                                </div>
                            </div>

                            <div className="col-md-8 col-sm-12">
                                <Carousel
                                    className="mb-5"
                                    slidesToShow={1}
                                    renderBottomCenterControls={() => false}
                                    wrapAround={true}
                                >
                                    {Object.keys(this.state.desiredOutput).map(
                                        (item, index) => (
                                            <div
                                                className="slider-model-color-trim row"
                                                key={index}
                                                onClick={() => this.handleModelSelection(item)}
                                            >
                                                <div className="col-12 align">
                                                    <img
                                                        height="100%"
                                                        width="50%"
                                                        className="p-2"
                                                        src={this.getModelImgSrc(item)}
                                                        alt=""
                                                    />
                                                </div>
                                                <h4>{item}</h4>
                                            </div>
                                        )
                                    )}
                                </Carousel>
                            </div>
                        </div>
                    )}
                </div>

                {/* Exterior Color Selection Carousel */}
                <div className="container-fluid">
                    {this.state.selectionMade &&
                        this.state.selectedModel &&
                        !this.state.selectedColor && (
                            <div className="row justify-content-center align-items-center">
                                <div className="col-12 d-flex justify-content-center mb-3">
                                    <div className="col-md-3 col-sm-2 align">
                                        <span className="badge badge-primary p-3 mr-3">
                                            {this.state.userSelection}
                                        </span>
                                    </div>

                                    <div className="col-md-3 col-sm-2 align">
                                        <span className="badge badge-primary p-3 mr-3 mb-1">
                                            {this.state.selectedModel}
                                        </span>
                                    </div>
                                </div>

                                <div className="col-md-8 col-sm-12">
                                    <Carousel
                                        className="mb-5"
                                        slidesToShow={1}
                                        // slidesToShow={this.handleNestedImageSlider()}
                                        renderBottomCenterControls={() => false}
                                        wrapAround={true}
                                    >
                                        {this.state.desiredOutput[
                                            this.state.selectedModel
                                        ].exteriorColors.map((item, index) => (
                                            <div
                                                className="slider-model-color-trim row"
                                                key={index}
                                                onClick={() =>
                                                    this.handleColorSelection(item.color)
                                                }
                                            >
                                                <div className="col-12 align">
                                                    <img
                                                        height="100%"
                                                        width="50%"
                                                        className="p-2"
                                                        src={this.getColorImgSrc(item.color)}
                                                        alt=""
                                                    />
                                                </div>
                                                <h4>{item.color}</h4>
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>
                            </div>
                        )}
                </div>

                {/* Trim Selection Carousel */}
                <div className="container-fluid">
                    {this.state.selectionMade &&
                        this.state.selectedModel &&
                        this.state.selectedColor &&
                        !this.state.selectedTrim && (
                            <div className="row justify-content-center align-items-center">
                                <div className="col-12 d-flex justify-content-center mb-3">
                                    <div className="col-md-3 col-sm-2 align">
                                        <span className="badge badge-primary p-3 mr-3">
                                            {this.state.userSelection}
                                        </span>
                                    </div>

                                    <div className="col-md-3 col-sm-2 align">
                                        <span className="badge badge-primary p-3 mr-3 mb-1">
                                            {this.state.selectedModel}
                                        </span>
                                    </div>

                                    <div className="col-md-3 col-sm-2 align">
                                        <span className="badge badge-primary p-3 mr-3 mb-1">
                                            {this.state.selectedColor}
                                        </span>
                                    </div>
                                </div>

                                <div className="col-md-8 col-sm-12">
                                    <Carousel
                                        className="mb-5"
                                        // slidesToShow={this.handleNestedImageSlider()}
                                        slidesToShow={1}
                                        renderBottomCenterControls={() => false}
                                        wrapAround={true}
                                    >
                                        {this.state.desiredOutput[
                                            this.state.selectedModel
                                        ].trims.map((item, index) => (
                                            <div
                                                className="slider-model-color-trim row"
                                                key={index}
                                                onClick={() => this.handleTrimSelection(item)}
                                            >
                                                <div className="col-12 align">
                                                    <img
                                                        height="100%"
                                                        width="50%"
                                                        className="p-2"
                                                        src={this.getTrimImgSrc(item)}
                                                        alt=""
                                                    />
                                                </div>
                                                <h4>{item}</h4>
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>
                            </div>
                        )}
                </div>

                {/* final selections output */}
                {this.state.selectionMade &&
                    this.state.selectedModel &&
                    this.state.selectedColor &&
                    this.state.selectedTrim && (
                        <div className="container-fluid">
                            <div className="row justify-content-center">
                                <div className="col-md-2 col-sm-12 mb-1">
                                    <span className="badge badge-primary p-3 mr-3">
                                        {this.state.userSelection}
                                    </span>
                                </div>

                                <div className="col-md-2 col-sm-12 mb-1">
                                    <span className="badge badge-primary p-3 mr-3">
                                        {this.state.selectedModel}
                                    </span>
                                </div>

                                <div className="col-md-2 col-sm-12 mb-1">
                                    <span className="badge badge-primary p-3 mr-3">
                                        {this.state.selectedColor}
                                    </span>
                                </div>

                                <div className="col-md-2 col-sm-12 mb-1">
                                    <span className="badge badge-primary p-3 mr-3">
                                        {this.state.selectedTrim}
                                    </span>
                                </div>
                            </div>

                            <div className="row justify-content-center pt-4 pb-3">
                                <div className="col-11 p-3 other-info-form">
                                    <h4 className="align mb-5">Other Information</h4>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-3 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="" className="font-weight-bold">
                                                        Zip Code
                          </label>
                                                    <input
                                                        value={this.state.formDetails.zipCode}
                                                        name="zipCode"
                                                        onChange={this.handleInputChange}
                                                        type="text"
                                                        className="form-control"
                                                        error={this.state.errors.zipCode}
                                                    />
                                                    {this.state.errors.zipCode && (
                                                        <div className="alert alert-danger">
                                                            {this.state.errors.zipCode}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-md-4 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="" className="font-weight-bold">
                                                        Travel Radius
                          </label>{' '}
                                                    <br />
                                                    <div className="custom-control custom-radio custom-control-inline">
                                                        <input
                                                            type="radio"
                                                            className="custom-control-input"
                                                            id="defaultInline1"
                                                            name="travelRadius"
                                                            value="30 Miles"
                                                            onChange={this.handleInputChange}
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="defaultInline1"
                                                        >
                                                            30 Miles
                            </label>
                                                    </div>
                                                    <div className="custom-control custom-radio custom-control-inline">
                                                        <input
                                                            type="radio"
                                                            className="custom-control-input"
                                                            id="defaultInline2"
                                                            name="travelRadius"
                                                            value="50 Miles"
                                                            onChange={this.handleInputChange}
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="defaultInline2"
                                                        >
                                                            50 Miles
                            </label>
                                                    </div>
                                                    <div className="custom-control custom-radio custom-control-inline">
                                                        <input
                                                            type="radio"
                                                            className="custom-control-input"
                                                            id="defaultInline3"
                                                            name="travelRadius"
                                                            value="100 Miles"
                                                            onChange={this.handleInputChange}
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="defaultInline3"
                                                        >
                                                            100 Miles
                            </label>
                                                    </div>
                                                    {this.state.errors.travelRadius && (
                                                        <div className="alert alert-danger">
                                                            {this.state.errors.travelRadius}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-md-5 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="" className="font-weight-bold">
                                                        Financing Preference
                          </label>{' '}
                                                    <br />
                                                    <div className="custom-control custom-radio custom-control-inline">
                                                        <input
                                                            type="radio"
                                                            className="custom-control-input"
                                                            id="defaultInline4"
                                                            name="financingPreference"
                                                            value="Dealer Financing"
                                                            onChange={this.handleInputChange}
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="defaultInline4"
                                                        >
                                                            Dealer Financing
                            </label>
                                                    </div>
                                                    <div className="custom-control custom-radio custom-control-inline">
                                                        <input
                                                            type="radio"
                                                            className="custom-control-input"
                                                            id="defaultInline5"
                                                            name="financingPreference"
                                                            value="Outside Financing"
                                                            onChange={this.handleInputChange}
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="defaultInline5"
                                                        >
                                                            Outside Financing
                            </label>
                                                    </div>
                                                    <div className="custom-control custom-radio custom-control-inline">
                                                        <input
                                                            type="radio"
                                                            className="custom-control-input"
                                                            id="defaultInline6"
                                                            name="financingPreference"
                                                            value="No Financing"
                                                            onChange={this.handleInputChange}
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="defaultInline6"
                                                        >
                                                            No Financing
                            </label>
                                                    </div>
                                                    {this.state.errors.financingPreference && (
                                                        <div className="alert alert-danger">
                                                            {this.state.errors.financingPreference}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            className="btn btn-primary btn-sm"
                                            type="submit"
                                            data-toggle="modal"
                                            data-target="#myModal"
                                        >
                                            Submit
                    </button>
                                    </form>

                                    <div className="modal" id="myModal">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h4 className="modal-title">Error Message</h4>
                                                    <button
                                                        type="button"
                                                        className="close"
                                                        data-dismiss="modal"
                                                    >
                                                        &times;
                          </button>
                                                </div>

                                                <div className="modal-body">
                                                    We are sorry but we are currently not in your
                                                    area. Sign up for our email to know when we are.
                          <form onSubmit={this.handleSubmit}>
                                                        <div className="row">
                                                            <div className="col-md-6 col-sm-12">
                                                                <div className="form-group">
                                                                    <label
                                                                        htmlFor=""
                                                                        className="font-weight-bold"
                                                                    >
                                                                        Zip Code
                                  </label>
                                                                    <input
                                                                        name="errorZipCode"
                                                                        type="text"
                                                                        className="form-control"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-sm-12">
                                                                <div className="form-group">
                                                                    <label
                                                                        htmlFor=""
                                                                        className="font-weight-bold"
                                                                    >
                                                                        Email
                                  </label>
                                                                    <input
                                                                        name="errorEmail"
                                                                        type="email"
                                                                        className="form-control"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <button
                                                                type="submit"
                                                                className="btn btn-sm btn-primary ml-3"
                                                            >
                                                                Send
                              </button>
                                                        </div>
                                                    </form>
                                                </div>

                                                <div className="modal-footer">
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger"
                                                        data-dismiss="modal"
                                                    >
                                                        Close
                          </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                {/* how it works */}
                <div className="home-section-how-it-works pt-5 pb-5">
                    <div className="overlay-light" />
                    <div className="container">
                        <div className="row mt-3">
                            <div className="col-12 mb-4">
                                <h2 className="align">How It Works</h2>
                            </div>
                            <div className="col-sm-12 col-md-4">
                                <p>
                                    First you tell us what you are looking for and we send the
                                    word out to dealerships in your area.
                </p>
                            </div>
                            <div className="col-sm-12 col-md-4">
                                <p>
                                    Next the dealerships compete for your business by
                                    responding with deals.
                </p>
                            </div>
                            <div className="col-sm-12 col-md-4">
                                <p>
                                    Lastly you can connect with a dealership to claim your
                                    deal.
                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* benefits */}
                <div className="home-section-benefits pt-5 pb-5">
                    <div className="overlay-dark" />
                    <div className="container d-flex">
                        <div className="row justify-content-between align-items-end">
                            <div className="col-12 mb-5">
                                <h2 className="align heading-light">Benefits</h2>
                            </div>
                            <div className="col-sm-6 col-md-3 benefits-widgets">
                                <h3 className="align benefits-widgets-heading mb-3 mt-2">
                                    01
                </h3>
                                Get quotes from all the dealerships in your area with the
                                ease of a few clicks.
              </div>
                            <div className="col-sm-6 col-md-3 benefits-widgets">
                                <h3 className="align benefits-widgets-heading mb-3 mt-2">
                                    02
                </h3>
                                Stress-free negotiations. Let DealStryker help you negotiate
                                for the best deal.
              </div>
                            <div className="col-sm-6 col-md-3 benefits-widgets">
                                <h3 className="align benefits-widgets-heading mb-3 mt-2">
                                    03
                </h3>
                                Chat with your local dealerships, we make it convenient for
                                you to communicate hassle free.
              </div>
                            <div className="col-sm-6 col-md-3 benefits-widgets">
                                <h3 className="align benefits-widgets-heading mb-3 mt-2">
                                    04
                </h3>
                                Bringing innovation to the car buying experience. The new,
                                better way to buy a vehicle.
              </div>
                        </div>
                    </div>
                </div>

                {/* call to action */}
                <div className="container pt-4 pb-4">
                    <div className="row d-flex justify-content-center">
                        <div className="align col-sm-12 col-md-6">
                            <a
                                href="https://www.dealstryker.com/dealerships"
                                role="button"
                                className="btn btn-lg btn-call-to-action"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Are you a Dealership?
                <br /> Click to learn more about us
              </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export const Home = View;