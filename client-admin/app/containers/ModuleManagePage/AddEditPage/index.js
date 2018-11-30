import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
// @material-ui/core components

import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TrashIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// core components
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import CustomInput from 'components/CustomInput/CustomInput';
import Button from 'components/CustomButtons/Button';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectOne } from '../selectors';
import { loadOneRequest, addEditRequest } from '../actions';

const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

class AddEdit extends Component {
  state = { ModuleName: '', Path: [] };
  handleEditorChange = (e, name) => {
    const newContent = e.editor.getData();
    this.setState({ [name]: newContent });
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handleAddPath = () => event => {
    event.persist();

    this.setState(state => ({
      Path: [...state.Path, { AccessType: '', AdminRoutes: [], ServerRoutes: [] }],
    }));
  };
  handleRemovePath = index => event => {
    event.persist();

    this.setState(state => ({
      Path: [...state.Path.slice(0, index), ...state.Path.slice(index + 1)],
    }));
  };
  handleAccessTypeChange = id => event => {
    event.persist();

    this.setState(state => ({
      Path: [
        ...state.Path.map(eachPath => {
          if (eachPath._id === id) {
            const newPath = { ...eachPath, AccessType: event.target.value };
            return newPath;
          }
          return eachPath;
        }),
      ],
    }));
  };
  handleAdminRoutesChange = (id, index) => event => {
    event.persist();
    this.setState(state => ({
      Path: [
        ...state.Path.map(eachPath => {
          if (eachPath._id === id) {
            let { AdminRoutes } = eachPath;
            AdminRoutes[index] = event.target.value;
            const newPath = { ...eachPath, AdminRoutes };
            return newPath;
          }
          return eachPath;
        }),
      ],
    }));
  };
  handleRemoveAdminRoute = (id, index) => event => {
    event.persist();
    this.setState(state => ({
      Path: [
        ...state.Path.map(eachPath => {
          if (eachPath._id === id) {
            let { AdminRoutes } = eachPath;
            const newPath = {
              ...eachPath,
              AdminRoutes: [...AdminRoutes.slice(0, index), ...AdminRoutes.slice(index + 1)],
            };
            return newPath;
          }
          return eachPath;
        }),
      ],
    }));
  };

  handleAddAdminRoute = id => event => {
    event.persist();
    this.setState(state => ({
      Path: [
        ...state.Path.map(eachPath => {
          if (eachPath._id === id) {
            let { AdminRoutes } = eachPath;
            const newPath = { ...eachPath, AdminRoutes: [...AdminRoutes, ''] };
            return newPath;
          }
          return eachPath;
        }),
      ],
    }));
  };
  handleServerRoutesMethodChange = (id, index) => event => {
    event.persist();
    this.setState(state => ({
      Path: [
        ...state.Path.map(eachPath => {
          if (eachPath._id === id) {
            let { ServerRoutes } = eachPath;
            ServerRoutes[index].method = event.target.value;
            const newPath = { ...eachPath, ServerRoutes };
            return newPath;
          }
          return eachPath;
        }),
      ],
    }));
  };
  handleServerRoutesRouteChange = (id, index) => event => {
    event.persist();
    this.setState(state => ({
      Path: [
        ...state.Path.map(eachPath => {
          if (eachPath._id === id) {
            let { ServerRoutes } = eachPath;
            ServerRoutes[index].route = event.target.value;
            const newPath = { ...eachPath, ServerRoutes };
            return newPath;
          }
          return eachPath;
        }),
      ],
    }));
  };
  handleAddServerRoute = id => event => {
    event.persist();
    this.setState(state => ({
      Path: [
        ...state.Path.map(eachPath => {
          if (eachPath._id === id) {
            let { ServerRoutes } = eachPath;
            const newPath = {
              ...eachPath,
              ServerRoutes: [...ServerRoutes, { route: '', method: '' }],
            };
            return newPath;
          }
          return eachPath;
        }),
      ],
    }));
  };
  handleRemoveServerRoute = (id, index) => event => {
    event.persist();
    this.setState(state => ({
      Path: [
        ...state.Path.map(eachPath => {
          if (eachPath._id === id) {
            let { ServerRoutes } = eachPath;
            const newPath = {
              ...eachPath,
              ServerRoutes: [...ServerRoutes.slice(0, index), ...ServerRoutes.slice(index + 1)],
            };
            return newPath;
          }
          return eachPath;
        }),
      ],
    }));
  };
  handleSave = () => {
    this.props.addEdit(this.state);
  };
  handleGoBack = () => {
    this.props.history.push('/wt/module-manage');
  };
  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOne(this.props.match.params.id);
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.one !== nextProps.one) {
      const oneObj = nextProps.one.toJS();
      this.setState(state => ({
        ...oneObj,
      }));
    }
  }
  render() {
    const { classes } = this.props;
    const { ModuleName, Path } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Add/Edit Module</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Module Name"
                      id="module-name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: ModuleName,
                        onChange: this.handleChange('ModuleName'),
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                {Path.map((each, pathIndex) => (
                  <Card key={`${each._id}-${pathIndex}`}>
                    <CardBody>
                      <GridContainer>
                        <GridItem md={3}>
                          <CustomInput
                            className="mt-0"
                            labelText="Access Type"
                            id={`${each._id}-access-type`}
                            formControlProps={{
                              fullWidth: false,
                            }}
                            inputProps={{
                              value: each.AccessType,
                              onChange: this.handleAccessTypeChange(each._id),
                            }}
                          />
                        </GridItem>
                        <GridItem md={3}>
                          <ul className="customUL">
                            {each.AdminRoutes.map((eachAdminRoute, index) => (
                              <li key={`${each._id}-${pathIndex}-each-admin-route-${index}`}>
                                <CustomInput
                                  labelText="Client Route"
                                  id={`${each._id}-each-admin-route-access-type-${index}`}
                                  formControlProps={{
                                    fullWidth: false,
                                  }}
                                  inputProps={{
                                    value: eachAdminRoute,
                                    onChange: this.handleAdminRoutesChange(each._id, index),
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton aria-label="Delete client route" onClick={this.handleRemoveAdminRoute(each._id, index)}>
                                          <TrashIcon fontSize="small" />
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </li>
                            ))}
                          </ul>
                          <Button size="small" aria-label="Add Client Route" onClick={this.handleAddAdminRoute(each._id)}>
                            Add Client Route
                          </Button>
                        </GridItem>
                        <GridItem md={6}>
                          <ul className="customUL">
                            {each.ServerRoutes.map((eachServerRoute, index) => (
                              <li key={`${each._id}-${pathIndex}-${eachServerRoute._id}-each-server-route-${index}`}>
                                <FormControl className="selectbox text-sm">
                                  <InputLabel htmlFor={`${each._id}-${eachServerRoute._id}-each-server-route-${index}-method`}>Method</InputLabel>

                                  <Select
                                    placeholder="Method"
                                    value={eachServerRoute.method}
                                    onChange={this.handleServerRoutesMethodChange(each._id, index)}
                                    inputProps={{
                                      name: 'Method',
                                      id: `${each._id}-${eachServerRoute._id}-each-server-route-${index}-method`,
                                    }}
                                  >
                                    {methods.map(each => (
                                      <MenuItem key={`${each._id}-${pathIndex}-${eachServerRoute._id}-each-server-route-method-${each}`} value={each}>
                                        {each}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                                <CustomInput
                                  labelText="Server Route"
                                  id={`${each._id}-${eachServerRoute._id}-each-admin-server-route-route-access-type-${index}`}
                                  formControlProps={{
                                    fullWidth: false,
                                  }}
                                  inputProps={{
                                    value: eachServerRoute.route,
                                    onChange: this.handleServerRoutesRouteChange(each._id, index),
                                  }}
                                />
                                <IconButton aria-label="Delete Server Route" onClick={this.handleRemoveServerRoute(each._id, index)}>
                                  <TrashIcon fontSize="small" />
                                </IconButton>
                              </li>
                            ))}
                          </ul>
                          <Button size="small" aria-label="Add Server Route" onClick={this.handleAddServerRoute(each._id)}>
                            Add Server Route
                          </Button>
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                    <CardFooter>
                      <IconButton className="btn-circle" color="danger" aria-label="Delete" onClick={this.handleRemovePath(pathIndex)}>
                        <TrashIcon size="small" />
                      </IconButton>
                    </CardFooter>
                  </Card>
                ))}
                <Card>
                  <CardBody className="text-center">
                    <IconButton className="btn-circle-add" color="primary" aria-label="Add" onClick={this.handleAddPath()}>
                      <AddIcon fontSize="large" />
                    </IconButton>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
            <CardFooter>
              <Button size="large" onClick={this.handleGoBack}>
                Back
              </Button>

              <Button size="large" color="primary" onClick={this.handleSave}>
                Save Changes
              </Button>
            </CardFooter>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

const withStyle = withStyles(styles);

const withReducer = injectReducer({ key: 'moduleManagePage', reducer });
const withSaga = injectSaga({ key: 'moduleManagePage', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
});

const mapDispatchToProps = dispatch => ({
  loadOne: payload => dispatch(loadOneRequest(payload)),
  addEdit: payload => dispatch(addEditRequest(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(AddEdit);
