'use strict';

import fetchCountries from './fetchCountries';
import countriesCard from '../templates/countriesCard.hbs';
import countriesList from '../templates/countriesList.hbs';

import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import debounce from 'lodash.debounce';

const refs = {
    input: document.querySelector('.js-input'),
    countryCardMarkup: document.querySelector('.countries-card'),
    listMarkup: document.querySelector('.countries-list'),
};

const searchCountry = () => {
    clearInput();

    const searchQuery = refs.input.value.trim();

    fetchCountries(searchQuery)
        .then(country => {
            if (country.length > 10) {
                error({
                    text: 'Too many matches! Please, type a more specific query!',
                });
            } else if (country.status === 404) {
                console.log(country.status);
                error({
                    text: 'There is no such country! Please, type a more specific query!',
                });
            } else if (country.length === 1) {
                renderCard(country);
            } else if (country.length <= 10) {
                renderList(country);
            }
        })
        .catch(fetchError);
};

refs.input.addEventListener('input', debounce(searchCountry, 500));

const renderCard = (country) => {
    refs.countryCardMarkup.innerHTML = countriesCard(country);
};

const renderList = (country) => {
    refs.listMarkup.insertAdjacentHTML('beforeend', countriesList(country));
};

const clearInput = () => {
    refs.listMarkup.innerHTML = '';
    refs.countryCardMarkup.innerHTML = '';
};

const fetchError = (Error) => {
    Error;
};