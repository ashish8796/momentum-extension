import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "./../../store/actionTypes";

function Quotes() {
  const { quoteUri, quote } = useSelector(state => state.quoteState);
  const dispatch = useDispatch();

  const fetchUri = (uri) => {
    fetch(uri)
      .then(response => response.json())
      .then(data => {
        let quote = data.contents.quotes[0].quote;
        dispatch(actions.getQuotes(quote))
      })
  }

  useEffect(() => {
    fetchUri(quoteUri);
  }, [])

  return (
    <div className="quotes">
      <h1 className="quote">{quote}</h1>
    </div>
  )
}

export default Quotes;