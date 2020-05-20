import React from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { Line } from 'react-chartjs-2';
import 'weather-icons/css/weather-icons.min.css';
import 'weather-icons/css/weather-icons-wind.css';
import classNames from 'classnames';
import Moment from 'react-moment';

import './ScrollMenu.scss';

const weatherIcon = {
    Thunderstorm: "wi-thunderstorm",
    Drizzle: "wi-sleet",
    Rain: "wi-storm-showers",
    Snow: "wi-snow",
    Atmosphere: "wi-fog",
    Clear: "wi-day-cloudy",
    Clouds: "wi-cloud",
    NightCloudy: "wi-night-alt-cloudy"

}

const windDescr = {
    South: "wi-from-s",
    South_East: "wi-from-se",
    South_West: "wi-from-sw",
    West: "wi-from-w",
    East: "wi-from-e",
    North: "wi-from-n",
    North_West: "wi-from-nw",
    North_East: "wi-from-ne"
}

let direction_wind = (windDescr, direction) => {
    let checkDirection = direction;
    switch (true) {
        case checkDirection === "south":
            return windDescr.South;
        case checkDirection === "south-east":
            return windDescr.South_East;
        case checkDirection === "south-west":
            return windDescr.South_West;
        case checkDirection === "west":
            return windDescr.West;
        case checkDirection === "east":
            return windDescr.East;
        case checkDirection === "north":
            return windDescr.North;
        case checkDirection === "north-west":
            return windDescr.North_West;
        case checkDirection === "north-east":
            return windDescr.North_East;
        default:
            return windDescr.South;
    }
}

let get_windSpeed = (speed) => {
    switch (true) {
        case speed >= 18:
            return 'Umiar.';
        default:
            return 'Słaby';
    }
}

let get_WeatherIcon = (icons, rangeId) => {

    switch (true) {
        case rangeId >= 200 && rangeId < 232:
            return icons.Thunderstorm;
        case rangeId >= 232 && rangeId < 300:
            return icons.NightCloudy;
        case rangeId >= 300 && rangeId <= 321:
            return icons.Drizzle;

        case rangeId >= 500 && rangeId <= 521:
            return icons.Rain;

        case rangeId >= 600 && rangeId <= 622:
            return icons.Snow;

        case rangeId >= 701 && rangeId <= 781:
            return icons.Atmosphere;

        case rangeId === 800:
            return icons.Clear;

        case rangeId >= 801 && rangeId <= 804:
            return icons.Clouds;

        default:
            return icons.Clouds;
    }
}

let translateWind = (direction) => {
    switch (true) {
        case direction === "south":
            return "Południowy";
        case direction === "south-east":
            return "Pd.-Wsch.";
        case direction === "south-west":
            return "Pd.-Zach.";
        case direction === "west":
            return "Zachódniowy";
        case direction === "east":
            return "Wschódniowy";
        case direction === "north":
            return "Północny";
        case direction === "north-west":
            return "Pn.-Zach.";
        case direction === "north-east":
            return "Pn.-Wsch.";
        default:
            return "Południowy";
    }
}


const MenuItem = ({ text: { time, dt_txt, temp, waste, wind_direction, wind_speed, iconId, pressure } }) => {

    let wasteClass = classNames("waste",{ "waste__rate": waste > 0 })
    let iconElem = get_WeatherIcon(weatherIcon, iconId)
    let windSpeed = get_windSpeed(wind_speed);
    let dirWind = direction_wind(windDescr, wind_direction);
    let translateText = translateWind(wind_direction);

    return (
        <div className="wrapperScrollMenu">
            <div className="day">
                {dt_txt}
            </div>
            <div className={`menu-item `}>
                <Moment format="HH:mm">{time}</Moment>
            </div>
            <div className="iconImage">
                <i className={`wi ${iconElem} display-1`} />
            </div>
            <div className="temp chartElem">
                <p>{`${temp}`}&deg;</p>
            </div>
            <div className="waste">
                <p>{waste > 0 ? `${waste} mm` : ""}</p>
                <div style={{ height: `${waste * 20}px` }} className={wasteClass}></div>
            </div>
            <div className="wind">
                <div className="wind__direction">
                    <i className={`wi wi-wind ${dirWind} `}></i>
                    <p>{translateText}</p>
                </div>
                <div className="wind__speed">
                    <p>{windSpeed}</p>
                    <p>{`${wind_speed} km/h`}</p>
                </div>
            </div>
            <div className="pressure">
                <p>{pressure}</p>
            </div>
        </div>
    );
};


export const Menu = (list, iconElem) => list ? list.map(element => {
    return <MenuItem text={element} iconElem={iconElem} key={element.id} />;
}) : "";



const Arrow = ({className }) => {
    return (
        <>
            <div
                className={className}
            ><span className="arr"></span></div>
        </>
    );
};


const ArrowLeft = Arrow({className: 'arrow-prev' });
const ArrowRight = Arrow({ className: 'arrow-next' });



function ScrollMenuComponent({ dataWeather, iconElem }) {

    let menuItems = Menu(dataWeather, iconElem);

    return (
        <div className="wrappApp">
            <ScrollMenu
                data={menuItems}
                arrowLeft={ArrowLeft}
                arrowRight={ArrowRight}
                hideArrows={true}
                hideSingleArrow={true}
                scrollBy={1}
                useButtonRole

            />
        </div>
    );
}

export default ScrollMenuComponent;
