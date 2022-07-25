window.addEventListener("DOMContentLoaded", function() {
    console.info("DOM loaded!");

    // HTML Elements to target for use
    const widthInput = document.querySelector("#width");
    const heightInput = document.querySelector("#height");
    const newWidthInput = document.querySelector("#newWidth");
    const newHeightInput = document.querySelector("#newHeight");
    const firstFieldsetErrorMessage = document.querySelector(".error-message-first");
    const secondFieldsetErrorMessage = document.querySelector(".error-message-second");
    
    // check if a number is a whole number or has a decimal place
    function is_whole_number(n) {
        var result = n - Math.floor(n) == 0;
        return result;
    }

    function is_valid_number(num) {
        // check if value is empty
        if(num == "") {
            return false;
        };

        //check if value is a number
        if(isNaN(num)){
            return false;
        };

        // check if value is not a whole number
        if (is_whole_number(num) == false) {
            return false;
        };

        // check if value is a negative number
        if (num < 0) {
            return false;
        };

        // check if value contains a period
        if(num.indexOf('.') !== -1) {
            return false;
        }

        // check if value equals to zero
        if (num == 0) {
          return false;
        }

        return true;
    }

    function create_preview() {
        const previewBox = document.querySelector("#previewBox");

        const width = document.querySelector("#width").value;
        const height = document.querySelector("#height").value;
        const maxWidth = 200;
        
        // Formula: (original height / original width) x new width = new height
        const newHeight = (height / width) * maxWidth;
        
        // if calculated height is larger than 200px, calculate new width with maxHeight 
        if(newHeight > 200) {
            const maxHeight = 200;
            
            // Formula: (original width / original height) x new height = new width
            const newWidth = (width / height) * maxHeight;
            const formattedWidth = Math.round(newWidth) + "px";

            previewBox.style.width = formattedWidth;
            previewBox.style.height = "200px";
        } else {
            const formattedHeight = Math.round(newHeight) + "px";

            previewBox.style.width = "200px";
            previewBox.style.height = formattedHeight;
        }
    }

    // aspect ratio: width / height = aspect ratio e.g. 1024x768 : 1024/768 = 1.33 = the ratio 1.33:1 
    function calculate_ratio(width, height) {
        let ratio = width / height;
        return ratio; // ratio:1
    }

    function calculate_aspect_ratio() {
        // clear new width and height inputs
        newWidthInput.value = "";
        newHeightInput.value = "";
        secondFieldsetErrorMessage.style.display = "none";

        // get width and height values
        const width = document.querySelector("#width").value;
        const height = document.querySelector("#height").value;

        if (is_valid_number(width) && is_valid_number(height)) {
            // don't show error message
            firstFieldsetErrorMessage.style.display = "none";

            newWidthInput.disabled = false;
            newHeightInput.disabled = false;

            // get html element to display result in
            const ratioResult = document.querySelector("#ratio");

            // calculate aspect ratio
            const ratio = calculate_ratio(width, height);

            let multiplyBy = 1;
            while (is_whole_number(ratio * multiplyBy) == false) {
                multiplyBy++;
            }
            
            // format aspect ratio
            const output = (ratio * multiplyBy) + ":" + multiplyBy;
            
            // display aspect ratio
            ratioResult.textContent = `${output}`;

            // create visual preview
            create_preview();
        } else {
            // show error message
            firstFieldsetErrorMessage.style.display = "block";

            newWidthInput.disabled = true;
            newHeightInput.disabled = true;
        }
    };

    function calculate_new_height() {
        // Formula: (original height / original width) x new width = new height

        // get width and height values
        const width = document.querySelector("#width").value;
        const height = document.querySelector("#height").value;

        const newWidth = document.querySelector("#newWidth").value;

        const newHeightInput = document.querySelector("#newHeight");
        newHeightInput.value = ""

        // check if width and height are not empty and are valid numbers
        if (is_valid_number(width) && is_valid_number(height)) {

            // check if new width is not empty and is valid number
            if (is_valid_number(newWidth)) {
                // don't show error message
                secondFieldsetErrorMessage.style.display = "none";

                const newHeight = (height / width) * newWidth;
                const formattedHeight = Math.round(newHeight); // format new value to closest round number

                newHeightInput.value = formattedHeight;
            } else {
                // show error message
                secondFieldsetErrorMessage.style.display = "block";
            }

        }
    }

    function calculate_new_width() {
        // Formula: (original width / original height) x new height = new width
        
        // get width and height values
        const width = document.querySelector("#width").value;
        const height = document.querySelector("#height").value;

        const newHeight = document.querySelector("#newHeight").value;

        const newWidthInput = document.querySelector("#newWidth");
        newWidthInput.value = "";

        // check if width and height are not empty and are valid numbers
        if (is_valid_number(width) && is_valid_number(height)) {

            // check if new width is not empty and is valid number
            if (is_valid_number(newHeight)) {
                // don't show error message
                secondFieldsetErrorMessage.style.display = "none";

                const newWidth = (width / height) * newHeight;
                const formattedWidth = Math.round(newWidth); // format new value to closest round number

                newWidthInput.value = formattedWidth;
            } else {
                // show error message
                secondFieldsetErrorMessage.style.display = "block";
            }

        }
    }
    
    // add event listener to calculate aspect ratio on width or height value change
    widthInput.addEventListener("input", calculate_aspect_ratio);
    heightInput.addEventListener("input", calculate_aspect_ratio);
    
    // add event listener to calculate new width or height
    newWidthInput.addEventListener("input", calculate_new_height);
    newHeightInput.addEventListener("input", calculate_new_width);
    
}, false);

