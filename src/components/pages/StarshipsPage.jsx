import React from 'react';
import {Link} from "react-router-dom";
import Table from '../common/Table';
import { getAllStarships } from '../../store/selectors/starships';
import { deleteStarship, changeBelovedStatus } from '../../store/actions/starships';
import { connect } from 'react-redux'

const StarshipsPage = ({starships, dispatchDeleteStarship, dispatchChangeBelovedStatus}) => {
    const handleBelovedStatus = id => {
        dispatchChangeBelovedStatus(id);
    }

    const handleDelete = (id) => {
        dispatchDeleteStarship(id);
    }

    const getColumns = () => {
        if (!starships.length) return [];

        return Object.keys(starships[0]).map(colName => {
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
                        <Link style={{color: '#ffc107'}} to={`/starships/${id}`}>{name}</Link>
                    )
                }
            }
            return {colName}
        })
    }

    return (
        <div>
            <h3>Starships from Star Wars Universe</h3>
            <Link
                to={"/starships/new"}
                className="btn btn-warning"
                style={{marginBottom: 25}}
            >
                New Starship
            </Link>
            <Table
                columns={getColumns()}
                data={Object.values(starships)}
                tableDescriptor="Planets"
                onDelete={handleDelete}
            />
        </div>

    );
    
};

const mapStateToProps = state => {
    return {
        starships: getAllStarships(state)
    };
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchDeleteStarship: id => {
            dispatch(deleteStarship(id));
        },
        dispatchChangeBelovedStatus: id => {
            dispatch(changeBelovedStatus(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StarshipsPage);
