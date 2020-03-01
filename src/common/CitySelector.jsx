import React, { useState, useMemo, useEffect } from 'react';
import PropType from 'prop-types';
import classnames from 'classnames';
import './CitySelector.css';

export default function CitySelector(props) {
    const { show, cityData, isLoading, onBack, fetchCityData } = props;
    const [searchKey, setSearchKey] = useState('');
    const key = useMemo(() => searchKey.trim(), [searchKey]);
    useEffect(() => {
        if (!show || cityData || isLoading) {
            return;
        }
        fetchCityData();
    }, [show, cityData, isLoading]); //只有这些参数改变的时候才会去请求城市列表数据
    return (
        <div className={classnames('city-selector', { hidden: !show })}>
            <div className="city-search">
                <div className="search-back" onClick={() => onBack()}>
                    <svg width="42" height="42">
                        <polyline
                            points="25,13,16,21,25,29"
                            stroke="#fff"
                            strokeWidth="2"
                            fill="none"
                        />
                    </svg>
                </div>
                <div className="search-input-wrapper">
                    <input
                        type="text"
                        value={searchKey}
                        className="search-input"
                        placeholder="城市、车站的中文或拼音"
                        onChange={e => setSearchKey(e.target.value)}
                    />
                </div>
                <i
                    className={classnames('search-clean', {
                        hidden: key.length === 0,
                    })}
                    onClick={() => setSearchKey('')}
                >
                    &#xf063;
                </i>
            </div>
        </div>
    );
}
CitySelector.prototype = {
    show: PropType.bool.isRequired,
    cityData: PropType.object,
    isLoading: PropType.bool.isRequired,
    onBack: PropType.func.isRequired,
};
