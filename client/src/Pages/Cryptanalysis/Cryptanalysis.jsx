import React, { useState } from 'react';
import Nav from "./../Landing/NavBar";

export default function Cryptanalysis() {
  const [ciphertext, setCiphertext] = useState('');
  const [freq, setFreq] = useState(Array(26).fill(0));

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
        }}
        value={ciphertext}
        placeholder="Enter your text here..."
      ></textarea>
      
      <div>
        <h2>Letter Frequencies:</h2>
        <table>
          <thead>
            <tr>
              <th>Letter</th>
              <th>Percentage</th>
            </tr>
          </thead>
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
    </div>
  );
}
