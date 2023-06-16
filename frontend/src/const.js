const fetchFun = () => {
    fetch('http://localhost:8000')
      .then((response) => {
        //console.log(response.json)
        return response.json();
      })
      .then((dataValue) => {
        //console.log(dataValue.message);
        setData(dataValue.message);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    
    fetchFun();
  }, []);