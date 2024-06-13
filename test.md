<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <title>Test code</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mocha/10.4.0/mocha.css"
        integrity="sha512-SjDc34mGAkSBKnNMasz1QPVustFyPQUHUO5wxzGNC5x9wQMcHwDHXCNRYowC/6DsX0lqvpCI1mKiVEQkws2olw=="
        crossorigin="anonymous" referrerpolicy="no-referrer" /> -->

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/monaco-editor@0.49.0/min/vs/editor/editor.main.min.css">

    <style>
        html {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: rgb(225, 225, 225);
        }

        div {
            box-sizing: border-box
        }

        div.box {
            width: 50%;
            padding: 10px
        }

        div.code {
            height: 200px;
        }

        div.instruction {
            font-size: 1.2rem;
        }

        div#js {
            width: 100%;
            height: 100%;
        }

        #mocha .test.pass::before {
            font-size: 18px;
        }
    </style>

</head>

<body>

    <div class="box language">JavaScript</div>

    <div class="box instruction">
        Skapa en funktion med namnet addNumbers. Funktionen ska summera 2 tal, vilka anges som argument.
    </div>

    <div class="box code">
        <div id="js"></div>
        <p>
            <button id="check">Check my code</button>
        </p>
    </div>

    <div id="mocha"></div>

    <script src="https://www.chaijs.com/chai.js" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mocha/10.4.0/mocha.min.js"
        integrity="sha512-nXPE3ZWyABKxsweBhVKza23EivvEs0wm8e13GrzCA6g3fzrqVAkJ7KHOYIUvl6DsMu5YnkSfkh++qYaE5g5n2Q=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.5/require.min.js"
        integrity="sha256-0SGl1PJNDyJwcV5T+weg2zpEMrh7xvlwO4oXgvZCeZk=" crossorigin="anonymous"></script>

        <script src="https://cdn.jsdelivr.net/npm/monaco-editor@0.49.0/min/vs/editor/editor.main.min.js"></script>


    <script class="mocha-init">
        mocha.setup('bdd');
        mocha.checkLeaks();
    </script>

    <script class="mocha-exec">
    </script>


    <script>
        // variables
        const checkButton = document.querySelector("#check");

        // listeners
        checkButton.addEventListener("click", function () {

            var javascriptContent = window.JavaScripteditor.getValue();
            localStorage.setItem("answer", javascriptContent);
            location.reload();



        });

        require.config({
            paths: {
                'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.49.0/min/vs'
            }
        });
        require(['vs/editor/editor.main'], function () {

            const answer = localStorage.getItem("answer") ? localStorage.getItem("answer") : "// Enter your code\n";
            window.JavaScripteditor = monaco.editor.create(document.getElementById('js'), {
                value: [
                    `${answer}`
                ].join('\n'),
                language: 'javascript',
                theme: "vs-dark"
            });


            // make sure mocha element is empty
            document.querySelector("#mocha").innerHTML = "";
            const javascriptContent = window.JavaScripteditor.getValue();
            console.log("javascriptContent", javascriptContent);

            // create new script element
            const newScript = document.createElement('script');
            newScript.id = "checkAnswer";
            newScript.text = javascriptContent;
            document.body.appendChild(newScript);

            // run test
            describe('addNumbers', function () {
                console.log("B", window);
                it('should be named addNumbers', function () {
                    // check if variable name exist in window object
                    chai.expect(window['addNumbers']).not.be.undefined;
                });
                it('should return sum of arguments', function () {
                    chai.expect(addNumbers(1, 2)).to.equal(3);
                });

                mocha.run();
            })

        });
    </script>


</body>

</html>
