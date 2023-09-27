import './ShowResult.scss'


//I denna komponenten tar jag emot datan från App.jsx
//Jag mapar ut all data och renderar den i min HTML.
function ShowResult ({ searchResult }) {
  //console.log(searchResult)

  const apiMainInfo = (result) => (
    <div className="result">
      <h2 className='result__word'>{result.word}</h2>
    </div>
  );

  const apiPhonetics = (phonetics) => {
     // Kollar om det finns minst ett objekt i phonetics med audio
    const hasAudio = phonetics.some((phonetic) => phonetic.audio); 
  
    if (!hasAudio) {
      return null; // Om det inte finns med så renderas det inte
    }
      // Om audio finns så renderas det
      return ( 
        <div className='phonetics'>
          <ul className='phonetics__ul'>
            {phonetics.map((phonetic, index) => (
              <li className='phonetics__li' key={index}>
                {phonetic.text}
                {phonetic.audio && (
                  <audio data-testid='audio' className='phonetics__audio' controls key={phonetic.text}>
                    <source src={phonetic.audio} type="audio/mpeg" />
                  </audio>
                )}
              </li>
            ))}
          </ul>
        </div>
      );
    };

  const apiMeanings = (meanings) => (
    <div className="meanings">
      <h3 className="meanings__title">Meanings</h3>
      <ul className="meanings__ul">
        {meanings.map((meaning, index) => (
          <li className="meanings__li" key={index}>
            <p className='meanings__speech'>Part of Speech: {meaning.partOfSpeech}</p>
            {/* Här valde jag att bara ta med de första fyra definitionerna per ord, vissa ord visade väldigt många. */}
            {meaning.definitions.slice(0, 4).map((definition, defIndex) => ( 
              <div key={defIndex}>
                <p>Definition: {definition.definition}</p>
                {definition.example && <p>Example: {definition.example}</p>}
                {definition.synonyms.length > 0 && (
                  <p>
                    Synonyms: {definition.synonyms.join(", ")}
                  </p>
                )}
                {definition.antonyms.length > 0 && (
                  <p>
                    Antonyms: {definition.antonyms.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );

return (
  <div className='showresult'>
  {searchResult.length === 0 ? ( //Här kollar jag ifall det finns något i searchResult, om det finns så ska texten försvinna.
        <p className='showresult__text'>Discover the meaning of words by typing and pressing the button.</p>
      ) : null}
    {searchResult.map((result, index) => (  //Om det finns något i searchResult renderas det här
          <div className='showresult__container' key={index}>
            {apiMainInfo(result)}
            {result.phonetics && apiPhonetics(result.phonetics)}
            {result.meanings && apiMeanings(result.meanings)}
          </div>
        ))}
      </div>
    )
  }

export default ShowResult