import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getQuotes } from "../../store/actions";

function Quotes() {
  const { quoteUri, quote, showQuote } = useSelector(
    ({ quoteState }) => quoteState
  );
  const dispatch = useDispatch();

  // TODO:
  // Move fetchUri to redux thunk

  // Try to async await
  const fetchUri = (uri) => {
    dispatch(getQuotes(uri));
  };

  // console.log(quote);
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
