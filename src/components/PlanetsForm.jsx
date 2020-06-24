import React, {useEffect, useState} from 'react';
import Input from "./common/Input";
import Button from './common/Button';
import { useSelector, useDispatch } from 'react-redux';
import {nanoid} from "nanoid";
import { getAllPlanets } from '../store/selectors/planets';
import { addPlanet, editPlanet } from '../store/actions/planets';
import { connect } from 'react-redux'

import {planetsColumns} from "../services/planetsService";

const initialPlanetData = planetsColumns.reduce((columns, columnName, ) => {
    columns[columnName] = '';
    return columns;
}, {})

const PlanetsForm = ({ planets, history, match, dispatchAddPlanet, dispatchEditPlanet}) => {
    const [formErrors, setFormErrors] = useState({});
    const [planetData, setPlanetData] = useState({...initialPlanetData});
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const planetId = match.params.id;
        if (planetId === "new") return;
        const existingPlanetData = planets.find(planet => planet.id === planetId)
        setPlanetData(existingPlanetData)
        setEditMode(true);
    }, [match.params.id, planets])

    const validate = (data) => { // super simple validation
        let errors = {};
        Object.entries(data).map(([propKey, propVal]) => {
            if (!propVal && !propKey.includes('beloved')) {
                errors = {...errors, [propKey]: 'Field should not be empty'};
            }
        })
        setFormErrors(errors);
        return errors
    }
    const handleEditPlanet = id => {
        dispatchEditPlanet(id);
    }
    const handleAddPlanet = item => {
        dispatchAddPlanet(item);
    }
    const onSubmit = (event) => {
        event.preventDefault();
        const errors = validate(planetData);

        if (Object.keys(errors).length) {
            return;
        }

        if (editMode) {
            handleEditPlanet(planetData);
        } else {
            handleAddPlanet({...planetData, beloved: false, id: nanoid()})
        }
        history.goBack()
    }

    const handleChange = (event) => {
        const {currentTarget: input} = event;
        const data = {...planetData};
        const errors = {...formErrors};
        if (errors[input.name]) {
            delete errors[input.name];
        }

        data[input.name] = input.value;
        setPlanetData(data);
        setFormErrors(errors)
    }

    return (
        <form>
            {planetsColumns.map(planetColName => (
                <Input
                    key={planetColName}
                    name={planetColName}
                    label={planetColName[0].toUpperCase() + planetColName.slice(1)}
                    value={planetData[planetColName]}
                    type={planetColName === 'beloved' ? 'checkbox' : 'input'}
                    error={formErrors[planetColName]}
                    onChange={event => handleChange(event)}
                />
            ))}
            <Button
                onClick={event => onSubmit(event)}
                label="Save"
                disabled={Object.keys(formErrors).length}
                classes="btn btn-dark"
            />
        </form>
    );
};

const mapStateToProps = state => {
    return {
        planets: getAllPlanets(state)
    };
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchEditPlanet: data => {
            dispatch(editPlanet(data));
        },
        dispatchAddPlanet: data => {
            dispatch(addPlanet(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanetsForm);