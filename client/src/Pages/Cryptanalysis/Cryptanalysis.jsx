import React, { useState } from 'react';
import Nav from "./../Landing/NavBar";

export default function Cryptanalysis() {
    const [ciphertext, setCiphertext] = useState('');
    const [freq, setFreq] = useState(Array(26).fill(0));
    const [nGrams, setNGrams] = useState([]);

    const toCaps = (text) => {
        return text.toUpperCase();
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

        const freqPercentages = freqArray.map(
        (count) => ((count * 100) / total).toFixed(1) + '%'
        );

        setFreq(freqPercentages);
    };

    const calculateNGrams = (text, n) => {
        const nGramCounts = {}; // Use an object to store N-gram counts
    
        for (let i = 0; i <= text.length - n; i++) {
          const nGram = text.substring(i, i + n);
          if (nGramCounts[nGram]) {
            nGramCounts[nGram]++;
          } else {
            nGramCounts[nGram] = 1;
          }
        }
    
        // Filter N-grams that appear more than once
        const filteredNGrams = Object.keys(nGramCounts).filter(
          (nGram) => nGramCounts[nGram] > 1
        );
    
        setNGrams(filteredNGrams);
    };

  return (
    <div>
      <Nav />
      <textarea
        id="ciphertext"
        rows="10"
        cols="50"
        onChange={(e) => {
          const newText = toCaps(e.target.value);
          setCiphertext(newText);
          calculateFrequency(newText);
          calculateNGrams(newText, 3); // Change 3 to the desired N-gram length
        }}
        value={ciphertext}
        placeholder="Enter your text here..."
      ></textarea>

      <div>
        <h2>Letter Frequencies:</h2>
        <table>
          <tbody>
            {freq.map((percentage, index) => (
              <tr key={String.fromCharCode(65 + index)}>
                <td>{String.fromCharCode(65 + index)}</td>
                <td>{percentage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2>N-grams:</h2>
        <ul>
        {nGrams.map((nGram, index) => (
            <li key={index}>{nGram}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}