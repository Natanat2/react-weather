import React from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

const ViewSelector = ({ view, onSelectView }) => {
    return (
        <div className="button-group">
            <ButtonGroup>
                <Button variant={view === 'current' ? 'primary' : 'secondary'} onClick={() => onSelectView('current')}>Сейчас</Button>
                <Button variant={view === 'forecast' ? 'primary' : 'secondary'} onClick={() => onSelectView('forecast')}>Ближайшие 5 дней</Button>
            </ButtonGroup>
        </div>
    );
};

export default ViewSelector;