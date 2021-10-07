import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Input, { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
import en from 'react-phone-number-input/locale/en.json';
import 'react-phone-number-input/style.css';
import lookupCountry from './utils/lookupCountry';

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  height: 100vh;
  background-color: hsl(15, 67%, 99%);

  & label,
  p {
    font-size: 20px;
    font-weight: 300;
    margin: 0;

    & > span {
      font-weight: 400;
    }
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 400px;

    & > input,
    select {
      padding: 1rem;
      border-radius: 5px;
      border: none;
      box-shadow: 0px 0px 1px hsla(0, 0%, 12%, 0.5);
    }
  }
`;

const CountrySelect = ({ value, onChange, labels, ...rest }) => (
  <select {...rest} value={value} onChange={(event) => onChange(event.target.value || undefined)}>
    <option value="">{labels.ZZ}</option>
    {getCountries().map((country) => (
      <option key={country} value={country}>
        {labels[country]} +{getCountryCallingCode(country)}
      </option>
    ))}
  </select>
);

export default function App() {
  // Set default state for location, phone number and country.
  const [phoneNumber, setPhoneNumber] = useState();
  const [country, setCountry] = useState();

  // Define handler function for browser Navigator API
  async function handleNavigator(pos) {
    const { latitude, longitude } = pos.coords;

    const userCountryCode = await lookupCountry({ latitude, longitude });
    setCountry(userCountryCode);
  }

  // useEffect to run the navigator API on initial render
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(handleNavigator, () => console.warn('permission was rejected'));
  }, []);

  return (
    <StyledPage>
      <StyledForm>
        <div>
          <label htmlFor="countrySelect">Country Select</label>
          <CountrySelect labels={en} value={country} onChange={setCountry} name="countrySelect" />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <Input country={country} value={phoneNumber} onChange={setPhoneNumber} placeholder="Enter phone number" name="phoneNumber" />
        </div>
      </StyledForm>
    </StyledPage>
  );
}
