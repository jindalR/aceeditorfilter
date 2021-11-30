import React from "react";
// import brace from 'brace';
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/snippets/text";
import "ace-builds/src-noconflict/theme-github";
import langTools from "ace-builds/src-noconflict/ext-language_tools";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueCritariaEditor: "",
      flagValue: false,
    };
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps);
  }

  onChange = (newValue) => {
    this.setState({
      flagValue: true,
      valueCritariaEditor: newValue,
    });
  };
  handleOnClickFilter = () => {
    console.log("check data");
  }

  render() {
    let filterColumns = [{colName: "Data"}, {colName: "Test"}];
    let clauseData = ["where"];
    let comparisonOperator = [
      { name: "Equal to", value: "=" },
      { name: "Greater than", value: ">" },
      { name: "Less than", value: "<" },
      { name: "Greater than or equal to", value: ">=" },
      { name: "Less than or equal to", value: "<=" },
      { name: "Not equal to", value: "<>" },
    ];

    let logicalOperator = ["AND", "OR", "BETWEEN", "IN", "LIKE", "NOT"];
    let nullValues = ["IS NULL", "IS NOT NULL"];
    let orderBy = ["ASC", "DESC"];
    // Value table data---------

    let staticWordCompleter = {
      getCompletions: function (editor, session, pos, prefix, callback) {
        callback(null, [
          ...filterColumns.map((column) => {
            return {
              caption: column.colName,
              value: column.colName,
              meta: "Column",
            };
          }),
          ...comparisonOperator.map(function (word1) {
            return {
              caption: word1.name,
              value: word1.value,
              meta: "comparison Operator",
            };
          }),
          ...logicalOperator.map(function (word1) {
            return {
              caption: word1,
              value: word1,
              meta: "Logicall Operator",
            };
          }),
          ...nullValues.map(function (word1) {
            return {
              caption: word1,
              value: word1,
              meta: "Null Operator",
            };
          }),
          ...orderBy.map(function (word1) {
            return {
              caption: word1,
              value: word1,
              meta: "Order By",
            };
          }),
          ...clauseData.map(function (word1) {
            return {
              caption: word1,
              value: word1,
              meta: "Clause",
            };
          }),
        ]);
      },
    };

    langTools.setCompleters([staticWordCompleter]);

    return (
      <React.Fragment>
            <div style={{ display : "flex" }}>
            <span style={{ padding: "9px", fontWeight: "700"}}>Search</span>
          <div className="ace-editor-container" style={{ zIndex: "2", width: "47%", border: "1px solid #dcdcdc", padding: "9px" }}>
            <AceEditor
              mode="text"
              theme="github"
              onChange={this.onChange}
              value={this.state.valueCritariaEditor}
              name="querybuilder"
              tabSize={1}
              editorProps={{
                $blockScrolling: true,
              }}
              maxLines = {1}
              minLines = {1}
              wrapEnabled={true}
              enableBasicAutocompletion={true}
              enableLiveAutocompletion={true}
              showPrintMargin={false}
              enableSnippets={true}
              showGutter={false}
              highlightActiveLine={false}
              width="100%"
              // height="17px"
              commands={[{
                name: 'Filter',
                bindKey: { win: 'enter', mac: 'enter' },
                exec:  this.handleOnClickFilter,
              }]}
            />
          </div>
          </div>
</React.Fragment>

);
}
}
export default App;
