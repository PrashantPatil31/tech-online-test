import React, { useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import "./DropdownComponent.css";

const DropdownComponent = ({
  subCategoryLabel,
  productLabel,
  subCategoryOptions,
  productOptions,
  onSubCategoryChange,
}) => {
  const [subCategory, setSubCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [editMode, setEditMode] = useState(false); 


  const handleSubCategoryChange = (selectedOptions) => {
    setSubCategory(selectedOptions);
    onSubCategoryChange(selectedOptions);
  };

  const handleProductChange = (selectedOptions) => {
    setProduct(selectedOptions);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode); 
  };

  return (
    <div className="dropdown-container">
      <div style={{ width: "40%" }}>
        <label className="dropdown-label">{subCategoryLabel}</label>
        <Multiselect
          id="subCategory"
          options={subCategoryOptions}
          selectedValues={subCategory}
          onSelect={handleSubCategoryChange}
          onRemove={handleSubCategoryChange}
          displayValue="name"
          className="dropdown"
          disable={!editMode} 
        />
      </div>
      <div style={{ width: "40%" }}>
        <label className="dropdown-label">{productLabel}</label>
        <Multiselect
          id="product"
          options={productOptions}
          selectedValues={product}
          onSelect={handleProductChange}
          onRemove={handleProductChange}
          displayValue="name"
          className="dropdown"
          disable={!editMode} 
        />
      </div>
      <div className="edit-btn">
        {editMode ? ( 
          <button className="edit-button" onClick={toggleEditMode}>
            Save
          </button>
        ) : (
          
          <button className="edit-button" onClick={toggleEditMode}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default DropdownComponent;

