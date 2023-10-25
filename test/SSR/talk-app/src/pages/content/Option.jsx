import React from "react";
function Option() {
  return (
    <>
      <h2>Option</h2>
      <div className="App">
        <label htmlFor="name">検索する名前</label>
        <input type="text" name="name" />
      </div>
    </>
  );
}
export default Option;
