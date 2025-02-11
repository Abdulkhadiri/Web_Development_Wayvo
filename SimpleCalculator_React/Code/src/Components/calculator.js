
function Calculator() {
    function add(){
        let x=document.getElementById('firstnum').value;
        let y=document.getElementById('secondnum').value;
        let res=parseInt(x)+parseInt(y);
        document.getElementById('result').value=res;

    }
    function sub(){
        let x=document.getElementById('firstnum').value;
        let y=document.getElementById('secondnum').value;
        let res=parseInt(x)-parseInt(y);
        document.getElementById('result').value=res;
    }
    function mul(){
        let x=document.getElementById('firstnum').value;
        let y=document.getElementById('secondnum').value;
        let res=parseInt(x)*parseInt(y);
        document.getElementById('result').value=res;
    }
    function div(){
        let x=document.getElementById('firstnum').value;
        let y=document.getElementById('secondnum').value;
        let res=parseInt(x)/parseInt(y);
        document.getElementById('result').value=res
    }
    
    function mod(){
        let x=document.getElementById('firstnum').value;
        let y=document.getElementById('secondnum').value;
        let res=parseInt(x)%parseInt(y);
        document.getElementById('result').value=res
    }
    function power(){
        let x=document.getElementById('firstnum').value;
        let y=document.getElementById('secondnum').value;
        let res=Math.pow(parseInt(x),parseInt(y));
        document.getElementById('result').value=res
    }
  return (
    <div class="calculator">
      <h1><i>Calculator</i></h1>
        <input type="number" id='firstnum' placeholder="Enter first number" />
        <input type="number" id='secondnum' placeholder="Enter second number" />
        <div id='calc' >
        <button onClick={add}>+</button>
        <button onClick={sub}>-</button>
        <button onClick={mul}>*</button>
        <button onClick={div}>/</button>
        <button onClick={mod}>%</button>
        <button onClick={power}>^</button>
        </div>
        <input type="number" placeholder="Result" id='result'/>
    </div>
  );
}
export default Calculator;