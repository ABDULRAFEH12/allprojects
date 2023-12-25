// import { useState } from 'react';
import { React, useState, } from 'react';

import img1 from '../Images/img1.png';
import img2 from '../Images/img2.png';
import img3 from '../Images/img3.png';



export default function Calculator(props) {
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const [isCalculatorOn, setIsCalculatorOn] = useState(false);




    // SO HERE WHEN I CLICK ON THE CLEAR BTN.. ALL THE NUMBER IN THE INPUT FIELD IS THEN DELETED 1 by 1..
    let handleClear = () => {
        setResult('');

    }


    // MAIN FUNCTION IS HERE WILL THE HELP OF EVAL.. WE CAN EASILY PERFORM FUNCTUNAILY...

    const handleParanClick = (value) => {
        if (!isCalculatorOn) {
            return; // Do nothing if the calculator is off
        }

        if (value === '(') {
            if (
                result === '' ||
                (!isNaN(result.slice(-1)) && !(/[+\-*/(]/).test(result.slice(-1)))) {
                setResult((prevResult) => prevResult + value);
            } else {
                setResult((prevResult) => prevResult + '*' + value);
            }
        } else if (value === ')') {
            setResult((prevResult) => prevResult + value);
        } else {
            setResult((prevResult) => prevResult + value);
        }
    };




    const handleEqual = () => {
        if (!isCalculatorOn) return;
        try {
            const parsedResult = parseExpression(result);
            setResult(parsedResult.toString());
            setError('');

        } catch (err) {
            setResult('');
            setError('Syntax Error');

            setTimeout(() => {
                setError('');

            }, 500); //
        }
    };

    const parseExpression = (expression) => {

        const parsedExpression = expression.replace(/([0-9)])\(/g, '$1*(');


        return eval(parsedExpression);
    };

    const handleNumberClick = (value) => {
        if (isCalculatorOn) {
            setResult((prevResult) => {
                let updatedResult = prevResult;
                if (!isNaN(value)) {
                    updatedResult += value;
                }


                const blinkingCursor = document.getElementById('blinkingCursor');
                if (blinkingCursor) {
                    blinkingCursor.style.display = 'none';
                }

                return updatedResult;
            });
        }
    };

    const handleOperatorClick = (operator) => {
        if (isCalculatorOn) {
            setResult(result + operator);
        }
    };


    // SO HERE WHEN I CLICK ON THE OFF BTN..
    const handleOff = () => {
        setResult('Calculator Is Off');
        setIsCalculatorOn(false);
        localStorage.setItem('calculatorState', 'off');
        const blinkingCursor = document.getElementById('blinkingCursor');
        if (blinkingCursor) {
            blinkingCursor.style.display = 'none'; // Hide the blinking cursor
        }
    };

    // SO HERE WHEN I CLICK ON THE DEL BTN .. SO ALL THE NUMBERS THAT ARE PRESENT IN THE INPUT BOX.. IS THEN DELETE 1 BY 1
    const handleDel = () => {
        if (result) {
            setResult(result.toString().slice(0, -1));
        }
    };

    // SO YOU GOT THE MESSSAGE WHEN WE CLICK ON THE ON BTN.. 
    const handleOn = () => {
        setIsCalculatorOn(true);
        setResult('');
        localStorage.setItem('calculatorState', 'on');
        const blinkingCursor = document.getElementById('blinkingCursor');
        if (blinkingCursor) {
            blinkingCursor.classList.add('blinking-on');
        }

        setTimeout(() => {
            setResult('');
        }, 500);
    };

    window.onload = () => {
        const calculatorState = localStorage.getItem('calculatorState');
        if (calculatorState === 'off') {
            setResult('Calculator Is Off');
        }
    };


    return (
        <>
            <div className='main_body'>
                <div className='container'>
                    <div className='row'>
                        <div className='child_container'>
                            <div className='row child_row'>
                                <div className='main_container'>
                                    <div className='all_tags'>
                                        <h2>Simple</h2>
                                        <h3>Calculator</h3>
                                        <h4>Using JavaScript</h4>

                                    </div>
                                </div>
                            </div>

                            {/********* SO HERE IS THE 2ND CONTAINER .. OF IMAGES..******/}


                            <div className='col-md-6'>
                                <div className='all_images_list'>
                                    <div className='html_div'>
                                        <span>HTML</span>
                                        <img src={img1} alt=''></img>
                                    </div>

                                    <div className='css_div'>
                                        <span>CSS</span>
                                        <img src={img2} alt=''></img>
                                    </div>

                                    <div className='js_div'>
                                        <span>JS</span>
                                        <img className='js_img' src={img3} alt=''></img>
                                    </div>

                                </div>
                            </div>
                        </div>
                        
                        {/* FROM HERE I GONNA MAKE THE CALCULATOR */}
                        <div className=' calculator_container '>
                            <div className='col-md-6 '>
                                <div className='input-container'>
                                    <input
                                        className={`input_box ${isCalculatorOn ? 'calculator-on' : 'calculator-off'}`}
                                        value={error || result}
                                        type='text'


                                        readOnly={true}

                                    >

                                    </input>
                                    <div className='cursor-container'>
                                        {isCalculatorOn && (
                                            <span id="blinkingCursor" className="blinking-cursor blinking-on">|</span>
                                        )}


                                    </div>

                                </div>

                                <div className='all_btns'>
                                    <div className='btn_rows_1'>
                                        <button onClick={() => handleOff('OFF')}>OFF</button>
                                        <button onClick={() => handleOn('ON')} >ON</button>
                                        <button onClick={() => handleClear('CLEAR')}>CLEAR</button>
                                        <button onClick={() => handleDel('DEL')}>DEL</button>

                                    </div>
                                    <div className='btn_rows_2'>
                                        <button onClick={() => handleNumberClick('9')} value={9} >9</button>
                                        <button onClick={() => handleNumberClick('8')} value={8}>8</button>

                                        <button onClick={() => handleParanClick('(')}>{'('}</button>
                                        <button onClick={() => handleParanClick(')')}>{')'}</button>



                                    </div>
                                    <div className='btn_rows_3'>
                                        <button onClick={() => handleNumberClick('7')} value={7}>7</button>
                                        <button onClick={() => handleNumberClick('6')} value={6}>6</button>
                                        <button onClick={() => handleNumberClick('5')} value={5}>5</button>
                                        <button onClick={() => handleOperatorClick('%')}>%</button>



                                    </div>
                                    <div className='btn_rows_4'>

                                        <button onClick={() => handleNumberClick('4')} value={4}>4</button>
                                        <button onClick={() => handleNumberClick('3')} value={3}>3</button>
                                        <button onClick={() => handleNumberClick('2')} value={2}>2</button>
                                        <button onClick={() => handleOperatorClick('*')}>*</button>

                                    </div>
                                    <div className='btn_row_5'>
                                        <button onClick={() => handleNumberClick('1')} value={1} >1</button>
                                        <button onClick={() => handleNumberClick('0')} >0</button>
                                        <button onClick={() => handleOperatorClick('/')} >/</button>

                                        <button onClick={() => handleOperatorClick('+')}>+</button>


                                    </div>
                                    <div className='btn_row_6'>
                                        <button onClick={() => handleEqual('=')} >=</button>

                                        <button onClick={() => handleOperatorClick('-')}>-</button>
                                        <button onClick={() => handleNumberClick('.')} >.</button>
                                        <button onClick={() => handleEqual('ANS')} >ANS</button>

                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div >
        </>
    )
}
