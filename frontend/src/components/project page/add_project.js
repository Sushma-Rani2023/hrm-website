function Add(){
    return (

    <div className="row" style={{margin:'40px'}}>
  <div className="col-md-3 lead">Inzint's project</div>
  <div className="col-md-3 col-md-offset-6 pull-right">
  <div class="btn-group pull-right">
      <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Add new employee
        <span class="caret"></span>
        <span class="sr-only">Toggle Dropdown</span>
      </button>
      <ul class="dropdown-menu">
        <li>Import employees</li>
        <li>Add single employe</li>
      </ul>
    </div>
    </div>
    </div>

    )
}
export default Add