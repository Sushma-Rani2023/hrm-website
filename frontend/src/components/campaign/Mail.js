import React from "react";
import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const Mail = (props) => {
  const [msg, setMsg] = useState();

  const handleform = (event) => {
    setMsg({ ...msg, [event.target.name]: event.target.value });
   
  };

  const handlesubmit = async (e) => {
    e.preventDefault()
    console.log("Message is ", msg);
    props.handleSend(msg);
    props.toggle()
  };

  return (
    <>
      <div>
        <div className="row main-row_header" style={{ fontSize: "1.5rem" }}>
          <p className="col-md-12">New Message</p>
        </div>
        <div>
          <div className="row">
            <div className="col-md-12">
              <form
                className="form-horizontal"
                method="POST"
                zzs
                id="add_new_user_form"
              >
                <div className="form-group row">
                  <label htmlFor="subject" className="col-md-2 control-label">
                    Subject
                  </label>
                  <div className="col-md-10">
                    <input
                      type="string"
                      className="form-control"
                      id="subject"
                      name="subject"
                      onChange={handleform}
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Editor
        apiKey="w5d68fz7nax5tcy1iq6i57gm7noite7eiyl1l7tqk4a9svcv"
        init={{
          height: 400,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
        }}
        onChange={(content, editor) => {
          setMsg({...msg, ['html']:content.level.content});
        }}
      />
      <div className="form-group row mt-2">
        <div>
          <button
            id="add_new_user_btn"
            className="btn btn-success  single-click"
            onClick={handlesubmit}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Mail;
