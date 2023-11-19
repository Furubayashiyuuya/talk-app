import React from "react";
import "firebase/compat/database";
import { useSelector } from "react-redux";
import { useTagcreateProcess } from "../../hooks/tagcreateProcess";

function CreateTag() {
  const { setTagText, tagText, tagmake } =
    useTagcreateProcess();
  const on = useSelector((state) => state.optionswitch);
  return (
    <>

        
        {on === "createtag" ? (
          <div className="createtag">
            <div className="taginput">
              <label htmlFor="tagname">タグ名</label>
              <input
                type="text"
                name="tagname"
                value={tagText}
                onChange={(e) => setTagText(e.target.value)}
              />
              <button onClick={tagmake}>作成</button>
            </div>
          </div>
        ) : null}
      
    </>
  );
}

export default CreateTag;
