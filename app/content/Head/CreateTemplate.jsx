import React from "react";
import "firebase/compat/database";
import { useSelector } from "react-redux";
import { useStampcreateProcess } from "../../hooks/stampcreateProcess";

function CreateTemplate() {

  const {
    createstamp,
    existingStamps,
    newStampText,
    setNewStampText,
  } = useStampcreateProcess();
  const on = useSelector((state) => state.optionswitch);
  return (
    <>

        
        {on === "createtemplate" ? (
          <div className="createtemplate">
            <div className="create-area">
              <input
                type="text"
                name="newStampText"
                value={newStampText}
                onChange={(e) => setNewStampText(e.target.value)}
              />
              {newStampText ? (
                <button className="create-button" onClick={createstamp}>
                  作成
                </button>
              ) : null}
              <div className="stamlist">
                {existingStamps.map((getstamp, index) => (
                  <button key={index} className="stamp" value={getstamp.text}>
                    {getstamp.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      
    </>
  );
}

export default CreateTemplate;
