function Popup(props) {
    return (
      <div className="popup">
        <h1>Popup Content Goes Here</h1>
        <button onClick={props.onClose}>Close Popup</button>
      </div>
    );
  }
  export default Popup