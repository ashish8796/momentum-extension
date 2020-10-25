import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "./../../store/actionTypes";

function Quotes() {
  const { quoteUri, quote, showQuote } = useSelector(
    ({ quoteState }) => quoteState
  );
  const dispatch = useDispatch();

  // TODO:
  // Move fetchUri to redux thunk

  // Try to async await
  const fetchUri = (uri) => {
    fetch(uri)
      .then((response) => response.json())
      .then((data) => {
        let quote = data.contents.quotes[0].quote;
        dispatch(actions.getQuotes(quote));
      });
  };

  useEffect(() => {
    fetchUri(quoteUri);
  }, []);

  return (
    showQuote && (
      <div className="quotes">
        <h1 className="quote">{quote}</h1>
      </div>
    )
  );
}

export default Quotes;
