import React, {useEffect, useState} from 'react';
import Input from "./common/Input";
import Button from './common/Button';
import {nanoid} from "nanoid";
import { getAllStarships } from '../store/selectors/starships';
import { addStarship, editStarship } from '../store/actions/starships';
import { connect } from 'react-redux'

import {starshipsColumns} from "../services/starshipsService";

const initialStarshipData = starshipsColumns.reduce((columns, columnName, ) => {
    columns[columnName] = '';
    return columns;
}, {})

const StarshipsForm = ({ starships, history, match, dispatchAddStarship, dispatchEditStarship}) => {
    const [formErrors, setFormErrors] = useState({});
    const [starshipData, setStarshipData] = useState({...initialStarshipData});
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const starshipId = match.params.id;
        if (starshipId === "new") return;
        const existingStarshipData = starships.find(starship => starship.id === starshipId)
        setStarshipData(existingStarshipData)
        setEditMode(true);
    }, [match.params.id, starships])

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
        dispatchEditStarship(id);
    }
    const handleAddPlanet = item => {
        dispatchAddStarship(item);
    }
    const onSubmit = (event) => {
        event.preventDefault();
        const errors = validate(starshipData);

        if (Object.keys(errors).length) {
            return;
        }

        if (editMode) {
            handleEditPlanet(starshipData);
        } else {
            handleAddPlanet({...starshipData, beloved: false, id: nanoid()})
        }
        history.goBack()
    }

    const handleChange = (event) => {
        const {currentTarget: input} = event;
        const data = {...starshipData};
        const errors = {...formErrors};
        if (errors[input.name]) {
            delete errors[input.name];
        }

        data[input.name] = input.value;
        setStarshipData(data);
        setFormErrors(errors)
    }

    return (
        <form>
            {starshipsColumns.map(starshipColName => (
                <Input
                    key={starshipColName}
                    name={starshipColName}
                    label={starshipColName[0].toUpperCase() + starshipColName.slice(1)}
                    value={starshipData[starshipColName]}
                    type={starshipColName === 'beloved' ? 'checkbox' : 'input'}
                    error={formErrors[starshipColName]}
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
        starships: getAllStarships(state)
    };
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchEditStarship: data => {
            dispatch(editStarship(data));
        },
        dispatchAddStarship: data => {
            dispatch(addStarship(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StarshipsForm);