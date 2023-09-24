import React, { useState, useEffect } from 'react';
import Nav from "./../Landing/NavBar"

export default function Cryptanalysis () {
    const [ciphertext, setCiphertext] = useState('');
    const [alphabet, setAlphabet] = useState('--------------------------');
    const [plaintext, setPlaintext] = useState('');
    const [keylength, setKeylength] = useState('');
    const [ngrams, setNgrams] = useState('');
    const [freq, setFreq] = useState(Array(26).fill('0%'));
    const [coincidenceTable, setCoincidenceTable] = useState([]);

    const toCaps = (obj) => {
        if (obj && obj.value) {
        obj.value = obj.value.toUpperCase();
        }
    };
  

  const doFreq = () => {
    toCaps(ciphertext);
    const freqArray = Array(26).fill(0);
    let total = 0;
  
    for (let i = 0; i < ciphertext.length; i++) {
      const charCode = ciphertext.charCodeAt(i);
      if (charCode >= 65 && charCode <= 90) {
        freqArray[charCode - 65]++;
        total++;
      }
    }
  
    const freqPercentages = freqArray.map((count) =>
      ((count * 100) / total).toFixed(1) + '%'
    );
  
    setFreq(freqPercentages);
  };
  

  const doNGrams = () => {
    toCaps(ciphertext);
    let fixedtext = '';
    let total = 0;

    for (let i = 0; i < ciphertext.length; i++) {
      if (ciphertext.charCodeAt(i) >= 65 && ciphertext.charCodeAt(i) <= 90) {
        fixedtext += ciphertext.charAt(i);
      }
    }

    let ngramsText = '';

    for (let i = 0; i < fixedtext.length - 2; i++) {
      for (let j = i + 2; j < fixedtext.length - 2; j++) {
        let str = '';

        for (let k = 0; k < fixedtext.length - j; k++) {
          if (fixedtext.charAt(i + k) !== fixedtext.charAt(j + k)) break;
          str += fixedtext.charAt(i + k);
        }

        if (str.length >= 3 && ngramsText.indexOf(str + ' ') === -1) {
          ngramsText += str + ' ';
        }
      }
    }

    setNgrams(ngramsText);
  };

  const doSubstitution = () => {
    toCaps(ciphertext);
    toCaps(alphabet);
    const subs = alphabet.split('');
    let plaintextText = '';

    for (let i = 0; i < ciphertext.length; i++) {
      if (ciphertext.charCodeAt(i) >= 65 && ciphertext.charCodeAt(i) <= 90) {
        plaintextText += subs[ciphertext.charCodeAt(i) - 65];
      } else {
        plaintextText += ciphertext.charAt(i);
      }
    }

    setPlaintext(plaintextText);
  };

  const calculateFrequency = (text) => {
    const freqArray = Array(26).fill(0);
    let total = 0;

    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      if (charCode >= 65 && charCode <= 90) {
        freqArray[charCode - 65]++;
        total++;
      }
    }

    const freqPercentages = freqArray.map((count) =>
      ((count * 100) / total).toFixed(1) + '%'
    );

    setFreq(freqPercentages);
  };

  const doCoincidence = () => {
    let keylengthInt = parseInt(keylength);
    keylengthInt = Math.min(keylengthInt, 20);
    keylengthInt = Math.max(keylengthInt, 1);

    if (isNaN(keylengthInt)) keylengthInt = 1;

    setKeylength(keylengthInt);

    toCaps(ciphertext);
    const fixedtext = ciphertext.split('').filter((char) => {
      const charCode = char.charCodeAt(0);
      return charCode >= 65 && charCode <= 90;
    });

    if (fixedtext.length < keylengthInt * 2) {
      alert('The ciphertext must be longer than twice the keylength');
      return;
    }

    const coincidenceRows = [];

    for (let i = 0; i < keylengthInt; i++) {
      const freqArray = Array(26).fill(0);
      const total = (fixedtext.length - 1 - i) / keylengthInt;

      for (let j = i; j < fixedtext.length; j += keylengthInt) {
        if (
          fixedtext[j].charCodeAt(0) >= 65 &&
          fixedtext[j].charCodeAt(0) <= 90
        ) {
          freqArray[fixedtext[j].charCodeAt(0) - 65]++;
        }
      }

      let index = 0.0;
      for (let j = 0; j < 26; j++) {
        if (freqArray[j] < 2) continue;
        index += (freqArray[j] * (freqArray[j] - 1.0)) / (total * (total - 1.0));
      }

      const cells = [];
      cells.push(<td key={i}>{i}</td>);

      for (let j = 0; j < 26; j++) {
        const height = (100 * freqArray[j]) / total;
        cells.push(
          <td key={j}>
            <div className="bar" style={{ height: height + 1 }}>
              <img src="pixel.bmp" alt="pixel" />
            </div>
          </td>
        );
      }

      cells.push(
        <td key={`index-${i}`}>{(index * 100).toFixed(2)}%</td>
      );

      coincidenceRows.push(<tr key={i}>{cells}</tr>);
    }

    setCoincidenceTable(coincidenceRows);
  };

  useEffect(() => {
    calculateFrequency(ciphertext);
  }, [ciphertext]);
    return (
        <div>
            <Nav />
        <textarea
            id="ciphertext"
            rows="10"
            cols="50"
            onChange={(e) => {
            setCiphertext(e.target.value);
            calculateFrequency(e.target.value);
            }}
            value={ciphertext}
        >
            Enter your ciphertext here!
        </textarea>
        <div>
          <div>
            <input
              name="freqButton"
              onClick={doFreq}
              value="Compute Letter Frequencies"
              type="button"
            />
          </div>
          <table id="freqtable">
                <tbody>
                    {Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index)).map((char, index) => (
                    <tr key={char}>
                        <td>{char}</td>
                        <td id={`f${char}`}>{freq[index]}</td>
                        <td>{String.fromCharCode(char.charCodeAt(0) + 13)}</td>
                        <td id={`f${String.fromCharCode(char.charCodeAt(0) + 13)}`}>
                        {freq[index + 13]}
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>

        </div>
        <div>
          <div>
            <input
              name="ngramsButton"
              onClick={doNGrams}
              value="Find Repeated N-grams"
              type="button"
            />
          </div>
          <textarea
            id="ngrams"
            rows="5"
            cols="50"
            readOnly={true}
            value={ngrams}
          >
            Repeated N-grams show up here!
          </textarea>
        </div>
        <div>
          <div>
            <input
              size="26"
              className="alphabet"
              value="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
              readOnly={true}
            />
          </div>
          <div>
            <input
              size="26"
              id="alphabet"
              className="alphabet"
              maxLength="26"
              onChange={(e) => setAlphabet(e.target.value)}
              value={alphabet}
            />
          </div>
          <div>
            <input value="Decipher" onClick={doSubstitution} type="button" />
          </div>
          <div>
            <textarea
              id="plaintext"
              rows="10"
              cols="50"
              readOnly={true}
              value={plaintext}
            >
              Your deciphered text will show up here!
            </textarea>
          </div>
        </div>
        <div>
          <div>
            <input
              type="button"
              value="Find Index of Coincidence"
              onClick={doCoincidence}
            />
          </div>
          <div>
            <input
              id="keylength"
              onChange={(e) => setKeylength(e.target.value)}
              value={keylength}
            />
          </div>
          <table id="coincidencetable">
            <tbody>{coincidenceTable}</tbody>
          </table>
        </div>
      </div>
    );
}