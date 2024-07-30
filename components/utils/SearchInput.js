const SearchInput = ({ placeholder, className, onChange, value }) => {
  return (
    <div className="input-group mb-3 position-relative d-flex align-items-center">
      <span className="ps-2 input-group-append d-flex align-items-center position-absolute">
        <i className="bi bi-search" style={{ color: "#8CBCD9" }}></i>
      </span>

      <input
        type="search"
        className="form-control rounded border-info"
        style={{paddingLeft: "2rem"}}
        id="search"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default SearchInput;