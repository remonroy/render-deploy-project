import React, { Fragment, useState } from "react";
import { shippingInfo } from "../Store/action/cartAction";
import "./shipping.css";
import { Country, State } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const dispatch = useDispatch();
  const { shipping } = useSelector((state) => state.cart);
  const alert = useAlert();
  const navigate = useNavigate();
  const [address, setAddress] = useState(shipping.address);
  const [city, setCity] = useState(shipping.city);
  const [state, setState] = useState(shipping.state);
  const [country, setCountry] = useState(shipping.country);
  const [pinCode, setPinCode] = useState(shipping.pinCode);
  const [phoneNo, setPhoneNo] = useState(shipping.phoneNo);
  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length < 11 || phoneNo.length > 11) {
      return alert.error("Phone number shod be 10 digits");
    }
    dispatch(shippingInfo({ address, city, state, country, pinCode, phoneNo }));
    navigate("/order/confirm");
  };
  return (
    <Fragment>
      <MetaData title="shipping details" />
      <CheckoutSteps activeStep={0} />
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>
          <form className="shippingForm" onSubmit={shippingSubmit}>
            <div>
              <HomeIcon />
              <input
                value={address}
                type="text"
                required
                placeholder="Enter address.."
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <LocationCityIcon />
              <input
                value={city}
                type="text"
                required
                placeholder="Enter city.."
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <PinDropIcon />
              <input
                value={pinCode}
                type="text"
                required
                placeholder="Enter pinCode.."
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            <div>
              <PhoneIcon />
              <input
                value={phoneNo}
                type="text"
                required
                placeholder="Enter phoneNo.."
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
            <div>
              <PublicIcon />
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <TransferWithinAStationIcon />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <input
              type="submit"
              value="country"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
