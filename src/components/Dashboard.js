import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import {Column} from 'primereact/column';
import classNames from 'classnames';
import {Dropdown} from 'primereact/dropdown';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {SplitButton} from 'primereact/splitbutton';

const Dashboard = (props) => {

    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [selectedThings, setSelectedThings] = useState("Things to do");
    let dt = useRef(null);
    let newData = false;
    let newColumn = false;

    //Data loaded on load of list
    useEffect(() => {
      setData(tableData);
    }, []); 

    // Data for things to do table
    const tableData= [
      {
        things: 'things1',
        owner: 'owner',
        status: 'Done',
      },
      {
        things: 'things2',
        owner: 'owner',
        status: 'Working',
      },
      {
        things: 'things3',
        owner: 'owner',
        status: 'Stuck',
      },
      {
        things: 'things4',
        owner: 'owner',
        status: 'Critical',
      },
      {
        things: 'things5',
        owner: 'owner',
        status: 'Working',
      }
    ];
 
    //Adding new row on click of + icon
  const addNewRow = () => {
    newData = true;
    let _data = [...data];
    if (newData)
      _data.push({
        things: "",
        status: '',
      })
    setData(_data);
  };

  const footer = (
    <div className="p-clearfix" style={{ width: "100%" }}>
      <Button className="p-button-secondary" 
        style={{ float: "left" }}
        label="Add"
        icon="pi pi-plus"
        onClick={addNewRow}
      />
    </div>
  );

  //List of datatypes for adding column
  const dataTypes = [
    {
      label: "Text",
      icon: "pi pi-sort-alpha-up",
      command: () => {
        addNewColumn();
      }
    },
    {
      label: "Timeline",
      icon: "pi pi-align-center",
      command: ()=> {
        addNewColumn();
      }
    },
    {
      label: "People",
      icon: "pi pi-users",
      command: ()=> {
        addNewColumn();
      }
    },
    {
      label: "Date",
      icon: "pi pi-calendar-times",
      command: ()=> {
        addNewColumn();
      }
    },
    {
      label: "Tags",
      icon: "pi pi-tag",
      command: ()=> {
        addNewColumn();
      }
    },
    {
      label: "Numbers",
      icon: "pi pi-sort-numeric-up",
      command: ()=> {
        addNewColumn();
      }
    },
  ];

  //Datatable header
  const header = (
    <div className="p-clearfix" style={{ lineHeight: "1.87em" }}>
      <SplitButton className="p-button-secondary" 
        icon="pi pi-plus-circle"
        model={dataTypes}
        style={{ float: "right" }}
      ></SplitButton>
       
    </div>
  );

  //  Cell Editing 
  const onEditorValueChange = (props, value) => {
    let updatedCars = [...props.value];
    updatedCars[props.rowIndex][props.field] = value;
    setData(updatedCars);
  };

  const inputTextEditor = (props, field) => {
    return (
      <InputText
        type="text"
        value={props.rowData[field]}
        onChange={(e) => onEditorValueChange(props, e.target.value)}
      />
    );
  };

  const thingsEditor = (props) => {
    return inputTextEditor(props, "things");
  };

  const ownerEditor = (props) => {
    return inputTextEditor(props, "owner");
  };

  const statuses = ['Done', 'Stuck', 'Working', 'Critical'];

  const statusEditor = (props) => {
    return (
      <Dropdown
        value={props.value[props.rowIndex].brand}
        options={statuses}
        onChange={(e) => onEditorValueChange(props, e.value)}
        style={{ width: "100%" }}
      />
    );
  };

  const dueDateEditor = (props) => {
      return inputTextEditor(props, 'due_date');
  };

  const statusBodyTemplate = (rowData) => {
    return <span className={classNames('customer-badge', 'status-' + rowData.status)}>{rowData.status}</span>;
  };

  //Adding new column
    const columnValues = [];

     //Adding new column on click of + icon
  const addNewColumn = () => {
    newColumn = true;
    let _columns = [...columnValues];
    if (newColumn)
      _columns.push({
        field: "",
        header: 'dynamic',
      })
    setColumns(_columns);
  };

  //passing dynmaic columns to datatable
  const dynamicColumns = columns.map((col,i) => {
    console.log(col, i);
      return <Column key={col.field} field={col.field} header={col.header} />;
  });

  const renderHeading = () => {
    return (
      <InputText
        value={selectedThings}
        onChange={onHeadingChange}
      />
    );
  };

  const onHeadingChange = (event) => {
    setSelectedThings(event.value);
  };
  const editHeading = renderHeading();

  return (
        <div>
          {/* <Growl ref={growl} /> */}
            <DataTable value={data} reorderableColumns={true} onRowReorder={(e) => setData(e.value)} ref={dt} 
            footer={footer}>
                <Column rowReorder={true} style={{width: '3em'}} />
                <Column columnKey="Things to do" field="things" header={editHeading} editor={thingsEditor} />
                <Column columnKey="Owner" field="owner" header="Owner" editor={ownerEditor}/>
                <Column columnKey="Status" field="status" header="Status" body={statusBodyTemplate} editor={statusEditor}/>
                <Column columnKey="Due date" field="due_date" header="Due date" editor={dueDateEditor}/>
                {dynamicColumns}
                <Column columnKey="Header" field="" header={header} style={{width: '5em'}} />
            </DataTable>
        </div>
    );
};
export default Dashboard;
