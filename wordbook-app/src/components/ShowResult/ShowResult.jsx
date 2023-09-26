import './ShowResult.scss'

function ShowResult ({ searchResult }) {
  //console.log(searchResult)

  const apiMainInfo = (result) => (
    <div className="result">
      <h2 className='result__word'>{result.word}</h2>
    </div>
  );

  const apiPhonetics = (phonetics) => (
    <div className='phonetics'>
   
    <ul className='phonetics__ul'>
      {phonetics.map((phonetic, index) => (
        <li className='phonetics__li' key={index}>
          {phonetic.text}
          {phonetic.audio && (
            <audio className='phonetics__audio' controls key={phonetic.text}>
              <source src={phonetic.audio} type="audio/mpeg" />
            </audio>
          )}
        </li>
      ))}
    </ul>
  </div>
  )

  const apiMeanings = (meanings) => (
    <div className='meanings'>
    <h3 className='meanings__title'>Meanings</h3>
    <ul className='meanings__ul'>
      {meanings.map((meaning, index) => (
        <li className='meanings__li' key={index}>
          <p>Part of Speech: {meaning.partOfSpeech}</p>
          <p>Definition: {meaning.definitions[0]?.definition}</p>
          {meaning.definitions[0]?.example && (
            <p>Example: {meaning.definitions[0].example}</p>
          )}
        </li>
      ))}
    </ul>
  </div>
  )


  return (
<div className='showresult'>
{searchResult.length === 0 ? (
      <p className='showresult__text'>Discover the meaning of words by typing and pressing the button.</p>
    ) : null}
{searchResult.map((result, index) => (
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