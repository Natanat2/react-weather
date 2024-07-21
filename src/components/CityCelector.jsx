import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

const CitySelector = ({ cities, selectedCity, onSelectCity }) => {
  return (
    <div className='button-group'>
      <ButtonGroup aria-label="City selection">
        {Object.keys(cities).map((city) => (
          <Button
            key={city}
            variant={selectedCity === city ? 'primary' : 'secondary'}
            onClick={() => onSelectCity(city)}
          >
            {city}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default CitySelector;
