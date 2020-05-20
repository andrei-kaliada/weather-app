import React from 'react'
import './SideBar.scss';

export default function SideBar() {
    return (
        <div>
            <aside className="sideBar">
                <div className="sideBar__item ">
                    <p>Dzień</p>
                </div>
                <div className="sideBar__item">
                    <p>Godzina</p>
                </div>
                <div className="sideBar__item">
                    <p>Prognoza</p>
                </div>
                <div className="sideBar__item">
                    <p>Temperatura</p>
                </div>
                <div className="sideBar__item">
                    <p>Opady</p>
                </div>
                <div className="sideBar__item">
                    <p>Kierunek <br /> wiatru</p>
                </div>
                <div className="sideBar__item">
                    <p>Prędkość <br /> wiatru</p>
                </div>
                <div className="sideBar__item">
                    <p>Ciśnienie</p>
                </div>
            </aside>
        </div>
    )
}
