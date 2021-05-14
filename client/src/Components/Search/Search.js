import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Data from "../Data/Data";
import SearchForm from "./SearchForm";
import FormTabs from "./FormTabs"
/*
CREDIT: https://gist.github.com/bendc/76c48ce53299e6078a76#file-random-color-js
*/
const randomColor = (() => {
  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  return () => {
    var h = randomInt(0, 360);
    var s = randomInt(42, 98);
    var l = randomInt(40, 90);
    return `hsl(${h},${s}%,${l}%)`;
  };
})();

const EMPTY_STATE = {
  formID: 1, //make sure to change this when using this
  color: "hsl(203, 100%, 32%)",
  instructor: "",
  quarters: [],
  years: [],
  department: "",
  classNumber: "",
  classCode: "",
  advancedVisible: false,
  excludePNP: false,
  covid19: false,
  lowerDiv: false,
  upperDiv: false
}


/*
  Handles all the searchforms, and keeps track of state of each form
  Also handles fetching instructors list, fetching results, and setting page to data
*/
export default function Search() {

  const INITIAL_INSTRUCTORS = [
    { name: "SHEPHERD, B.", value: "SHEPHERD, B." },
    { name: "LEVIN, K.", value: "LEVIN, K." },
    { name: "SEONG, A.", value: "SEONG, A." },
    { name: "SPENCER, P.", value: "SPENCER, P." },
    { name: "WOLFF, B.", value: "WOLFF, B." }];

  const [instructors, setInstructors] = useState(INITIAL_INSTRUCTORS);
  const [forms, setForms] = useState({
    1: EMPTY_STATE
  }); // {formID: formState}
  const [currentForm, setCurrentForm] = useState(1);
  const [lastFormID, setLastFormID] = useState(0);
  const [results, setResults] = useState([]);

  //on component mount, fetch instructors and add a form
  useEffect(() => fetchInstructors(), []);
  //check currentform in forms and update lastformid on change of forms{}
  useEffect(() => updateFormNumbers(), [forms]);
  /*
    checks if currentForm is in forms{}
    if not, set currentforms to last formID
    also updates lastFormID
    called on every change of forms
  */
  const updateFormNumbers = () => {
    if (!(currentForm in forms)) {
      const formIDs = Object.keys(forms);
      const id = formIDs[formIDs.length - 1];
      setCurrentForm(id);
      console.log("updating currentformid to " + id);
    }
    setLastFormID(lastFormID + 1)
    return null;
  }
  /*
    called by SearchForm component with currentFormID
  */
  const handleFormValueChange = ({ formID, name, value }) => {
    if (!(formID in forms)) {
      console.log("Form " + formID + " not found in forms");
      console.log(Object.keys(forms));
      return;
    }
    let formState = forms[formID];
    formState[name] = value;
    setForms({ ...forms, [formID]: formState });
  }

  /*
    Adds a new form and formstate
  */
  const addForm = () => {
    let newFormID = lastFormID + 1;
    let newState = {
      formID: newFormID, //make sure to change this when using this
      color: randomColor(),
      instructor: "",
      quarters: [],
      years: [],
      department: "",
      classNumber: "",
      classCode: "",
      advancedVisible: false,
      excludePNP: false,
      covid19: false,
      lowerDiv: false,
      upperDiv: false
    }
    var newForms = Object.assign({ [newFormID]: newState }, forms);
    setForms(newForms);
    setCurrentForm(newFormID);
  }

  /*
    Removes form with given formID
  */
  const removeForm = (formID) => {
    //copy forms
    var newForms = Object.assign({}, forms);
    delete newForms[formID];
    setCurrentForm(Object.keys(newForms).length - 1);
    setForms(newForms);
    updateFormNumbers();
  }

  const fetchInstructors = async () => {
    fetch("/instructors")
      .then((res) => res.json())
      .then((res) =>
        setInstructors(
          res.instructors.map((teacher) => ({
            name: teacher,
            value: teacher,
          })))
      ).then(addForm());
  }

  /*
  fetches results for one particular form as JSON
  */
  const fetchDataFromForm = async (formID) =>
    fetch("/search", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(forms[formID]),
    }).then((res) => res.json())
      .then((res) => Object.assign({ color: forms[formID].color }, res))

  /*
  Runs when submit button is clicked
  For each formID in formStates, fetches from /search
  and adds to results a new key/value pair where
  key=formID and value=allTheDataForThatForm
  */
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("form submitted");
    const getResultData = async () => {
      return Promise.all(
        Object.keys(forms).map(async (formID) => {
          return await fetchDataFromForm(formID);
        })
      );
    };
    getResultData().then((results) => {
      setResults(results);
    });
  };

  /*
  Creates an array of objects with the grade data and colors
  to put in the graph dataset in Data.js
   */
  const dataForGraph = (gradeData) => {
    let dataset = [];
    let colors = ['rgba(72, 21, 103, 0.6)', 'rgba(57, 86, 140, 0.6)', 'rgba(31, 150, 138, 0.6)', 'rgba(85, 198, 104, 0.6)'];
    let count = 0;
    for (let data of gradeData) {
      dataset.push({
        label: data.instructor,
        data: [data.a, data.b, data.c, data.d, data.f, data.p, data.np],
        backgroundColor: data.color
      });
      count++;
    }
    return dataset;
  }

  return (
    <div className="search-content-wrapper">
      <Form onSubmit={handleFormSubmit}>
        <Row>
          {currentForm in forms ?
            <SearchForm
              formID={currentForm}
              instructors={instructors}
              handleFormValueChange={handleFormValueChange}
              state={forms[currentForm]}
            /> : null}
        </Row>

        <Row className="justify-content-center search-form-row" noGutters>
          <Col className="text-center">
            <Form.Group >
              <Button
                className="submit-button"
                as="input"
                type="submit"
                name="submit"
                value="Submit"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center form-tabs-row">
            {lastFormID > 0 ?
              <FormTabs
                currentForm={currentForm}
                forms={forms}
                setCurrentForm={setCurrentForm}
                removeForm={removeForm}
                addForm={addForm} /> : null}
          
        </Row>
      </Form>

      {results.length !== 0 && <Data data={results} graphData={dataForGraph(results)} />}
    </div>
  );
}





class OldSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructors: [],
      forms: {
        1: (
          <SearchForm
            handleFormSubmit={this.handleFormSubmit}
            updateForm={this.updateForm}
            formID={1}
            color={"hsl(203, 100%, 32%)"}
            instructors={[]}
          />
        ),
      }, //{formID : formComponent}
      formStates: {
        1: { instructor: "", color: "hsl(203, 100%, 32%)" },
      }, //{formID : formStates}
      currentForm: 1,
      numForms: 1,
      // page: HOME, // what the page will display below the search forms (HOME or DATA)
      result: [],
    };
    //we need to do this for some reason
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  /*
  fetch /instructors and set state.instructors to options list
  make sure forms and formStates is empty
  then add new empty form
  */
  componentDidMount() {
    fetch("/instructors")
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          instructors: res.instructors.map((teacher) => ({
            name: teacher,
            value: teacher,
          })),
        })
      )
      .then(() =>
        this.setState({
          forms: {
            1: (
              <SearchForm
                handleFormSubmit={this.handleFormSubmit}
                updateForm={this.updateForm}
                formID={this.state.currentForm}
                instructors={this.state.instructors}
                color={"hsl(203, 100%, 32%)"}
              />
            ),
          },
          formStates: { 1: { instructor: "", color: "hsl(203, 100%, 32%)" } },
        })
      );
  }

  /*
  Runs when form name is clicked and sets current form
  */
  setCurrentForm = (key, e) => {
    e.preventDefault(); //ignore link behavior
    this.setState(
      {
        currentForm: key,
      },
      function () {
        this.forceUpdate();
      }
    );
  };

  /*
  increments numForms and currentForm
  adds new SearchForm component
  NOTE: doesn't add state to formStates
    because that happens when searchform is updated
  */
  addNewForm = () => {
    if (this.state.currentForm >= 4) {
      alert("chiiiiiiiiiiiiiiiilllllllll");
    } else {
      let newColor = randomColor();
      this.setState(
        {
          numForms: this.state.numForms + 1,
          currentForm: this.state.numForms + 1,
        },
        function () {
          this.setState({
            forms: {
              ...this.state.forms,
              [this.state.currentForm]: (
                <SearchForm
                  handleFormSubmit={this.handleFormSubmit}
                  updateForm={this.updateForm}
                  formID={this.state.currentForm}
                  color={newColor}
                  instructors={this.state.instructors}
                />
              ),
            },
            formStates: {
              ...this.state.formStates,
              [this.state.currentForm]: { instructor: "", color: newColor },
            },
          });
        }
      );
    }
  };

  /*
  self explanatory
  */
  removeForm = async (formID) => {
    if (this.state.numForms > 1) {
      //copy forms
      var newForms = Object.assign({}, this.state.forms);
      delete newForms[formID];
      //newForms = Object.assign({}, Object.values(newForms));

      var newFormStates = Object.assign({}, this.state.formStates);
      delete newFormStates[formID];
      //newFormStates = Object.assign({}, Object.values(newFormStates));

      this.setState(
        {
          forms: newForms,
          formStates: newFormStates,
        },
        function () {
          this.setState({
            currentForm: Object.keys(this.state.formStates)[0],
            numForms: this.state.numForms - 1,
          });
        }
      );
    }
  };
  /*
  update a particular form's formState
  formID should be included in formState
  */
  updateForm = (formState) => {
    this.setState({
      formStates: {
        ...this.state.formStates,
        [formState.formID]: formState,
      },
    });

  };

  /*
  Probably the worst part of this code
  Runs when submit button is clicked
  For each formID in formStates, fetches from /search
  and adds to results a new key/value pair where
  key=formID and value=allTheDataForThatForm
  finally, sets page to data component with results
  */
  handleFormSubmit = async (e) => {
    console.log("form submitted");
    e.preventDefault();
    let { formStates } = this.state;
    const fetchDataFromForm = async (formID) => {
      let result = fetch("/search", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formStates[formID]),
      }).then((res) => res.json());
      return result;
    };
    const getResultData = async () => {
      return Promise.all(
        Object.keys(formStates).map(async (formID) => {
          return await fetchDataFromForm(formID);
        })
      ); //only god can judge me
    };
    getResultData().then((results) => {
      // console.log('RESULTS: ', results);
      // this.setState({
      //   page: <Data data={results} graphData={this.dataForGraph(results)} />
      // })
      this.setState({ result: results });
    });
  };

  /*
  Creates an array of objects with the grade data and colors
  to put in the graph dataset in Data.js
   */
  dataForGraph = (gradeData) => {
    let dataset = [];
    let colors = ['rgba(72, 21, 103, 0.6)', 'rgba(57, 86, 140, 0.6)', 'rgba(31, 150, 138, 0.6)', 'rgba(85, 198, 104, 0.6)'];
    let count = 0;
    for (let data of gradeData) {
      dataset.push({
        label: data.instructor,
        data: [data.a, data.b, data.c, data.d, data.f, data.p, data.np],
        backgroundColor: colors[count]
      });
      count++;
    }

    return dataset;
  }

  /*
  helper method to lowercase part of instructor name
  "LAST, F." --> "Last, F."
  */
  formatInstructorName = (name) => {
    if (name) {
      return (
        name.substring(0, 1) +
        name.substring(1, name.indexOf(",")).toLowerCase() +
        name.substring(name.indexOf(","), name.length)
      );
    } else {
      return "";
    }
  };

  formTabs = (formStates) => {
    return Object.keys(formStates).map((key) => {
      return (
        <Col lg={3} md={6} sm={12} key={key} className="text-center">
          <div
            style={{
              borderBottomColor: formStates[key].color,
              backgroundColor:
                key === this.state.currentForm
                  ? "hsla(" + formStates[key].color.slice(4, -1) + ", 25%)"
                  : "transparent",
            }}
            className={
              "form-tab " +
              (key === this.state.currentForm ? "selected-form-tab" : "")
            }
            onClick={(e) => this.setCurrentForm(key, e)}
          >
            <div
              className="close-button"
              style={this.state.numForms === 1 ? { display: "none" } : {}}
              onClick={() => this.removeForm(key)}
            >
              <a href="#">✕</a>
            </div>
            <h5 className="form-tab-header">
              {formStates[key].instructor !== ""
                ? this.formatInstructorName(formStates[key].instructor)
                : "Form " + key}
            </h5>
          </div>
        </Col>
      );
    });
  };
  /*
  technically renders ALL the searchforms, but makes only
  the current one visible with css lol
  */
  render() {
    let { forms, currentForm, formStates, numForms } = this.state;
    return (
      <Container>
        <Form onSubmit={this.handleFormSubmit}>
          {Object.keys(forms).map((key) => {
            return (
              <Row
                key={key}
                className={key === "" + currentForm ? "visible" : "invisible"}
              >
                {forms[key]}
              </Row>
            );
          })}
          <Row className="justify-content-center search-form-row" noGutters>
            <Col className="text-center">
              <Form.Group>
                <Button
                  className="submit-button"
                  as="input"
                  type="submit"
                  name="submit"
                  value="Submit"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="justify-content-center">
            {this.formTabs(formStates)}
            <Col sm={"auto"}>
              {numForms < 4 ?
                <Button
                  className="add-form-button"
                  onClick={this.addNewForm}
                >
                  +
                    </Button> : null}
            </Col>
          </Row>
        </Form>
        {this.state.result.length !== 0 && <Data data={this.state.result} graphData={this.dataForGraph(this.state.result)} />}
      </Container>
    );
  }
}
