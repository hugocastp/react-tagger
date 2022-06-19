import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const DropdownTags = ({ tags, setSelectedTag }) => {
  // set dropdown value and have initial of none
  const [selection, setSelection] = React.useState("");
  const handleChange = (event) => {
    setSelection(event.target.value);
    setSelectedTag(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 120}} style={{width : 130}} >
      <FormControl fullWidth>
        <InputLabel id="col-selection">Etiquetas</InputLabel>
        <Select
          style={{ backgroundColor: "#FFFF", fontSize: "1rem" }}
          labelId="label-id-tag"
          id="id-tag"
          value={selection}
          label="tags"
          onChange={handleChange}
        >
          {tags?.map((item,id) => (
            <MenuItem value={item} key={id}> { item }</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropdownTags;
