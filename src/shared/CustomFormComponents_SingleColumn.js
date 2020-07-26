import React from "react";

const comp = (component, field, props) => {
  const { widget, ...rest } = props;
  const COMPONENT_NAME = component;
  return (
    <>
      <div className="p-col-12 p-md-4 p-lg-4">
        <label
          htmlFor={field.name}
          style={{
            color: "#504a4a",
            float: "left",
            marginLeft: "2px"
          }}
        >
          {props.label}
          {props.req ? <span style={{ color: "red" }}>* </span> : null}
        </label>
      </div>
      {COMPONENT_NAME.name !== "InputTextarea" ? (
        <>
          <div className="p-col-12 p-md-8 p-lg-8">
            <COMPONENT_NAME
              {...field}
              {...rest}
              id={field.name}
              style={{
                fontWeight: "bold",
                border: "1px solid #f1f1f1",
                borderRadius: "3px",

                marginBottom: "5px"
              }}
            />
          </div>
        </>
      ) : (
        <div className="p-col-12 p-md-12 p-lg-12">
          <COMPONENT_NAME
            {...field}
            {...rest}
            id={field.name}
            style={{
              fontWeight: "500px",
              border: "1px solid #f1f1f1",
              borderBottom: "1px  solid #f1f1f1",
              borderRadius: "3px",
              marginBottom: "10px"
            }}
          />
        </div>
      )}

    </>
  );
};

export const CustomComponent = ({
  field, 
  form: { touched, errors, values }, 
  ...props
}) => comp(props.widget, field, props, touched, errors, values);

export default CustomComponent;
