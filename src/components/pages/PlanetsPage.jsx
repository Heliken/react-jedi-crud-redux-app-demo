import React from 'react';
import {Link} from "react-router-dom";
import Table from '../common/Table';
import { getAllPlanets } from '../../store/selectors/planets';
import { deletePlanet, changeBelovedStatus } from '../../store/actions/planets';
import { connect } from 'react-redux'

const PlanetsPage = ({planets, dispatchDeletePlanet, dispatchChangeBelovedStatus}) => {
    const handleBelovedStatus = id => {
        dispatchChangeBelovedStatus(id);
    }

    const handleDelete = (id) => {
        dispatchDeletePlanet(id);
    }

    const getColumns = () => {
        if (!planets.length) return [];

        return Object.keys(planets[0]).map(colName => {
            if (colName === 'beloved') {
                return {
                    colName,
                    content: ({beloved, id}) => (
                        <input
                            type="checkbox"
                            checked={beloved}
                            onChange={() => handleBelovedStatus(id)}
                        />
                    )
                }
            }
            if (colName === 'name') {
                return {
                    colName,
                    content: ({name, id}) => (
                        <Link style={{color: '#ffc107'}} to={`/planets/${id}`}>{name}</Link>
                    )
                }
            }
            return {colName}
        })
    }

    return (
        <div>
            <h3>Planets from Star Wars Universe</h3>
            <Link
                to={"/planets/new"}
                className="btn btn-warning"
                style={{marginBottom: 25}}
            >
                New Planet
            </Link>
            <Table
                columns={getColumns()}
                data={Object.values(planets)}
                tableDescriptor="Planets"
                onDelete={handleDelete}
            />
        </div>

    );
    
};

const mapStateToProps = state => {
    return {
        planets: getAllPlanets(state)
    };
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchDeletePlanet: id => {
            dispatch(deletePlanet(id));
        },
        dispatchChangeBelovedStatus: id => {
            dispatch(changeBelovedStatus(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanetsPage);
