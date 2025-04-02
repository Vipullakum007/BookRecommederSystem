// Autocomplete functionality for book search
document.addEventListener('DOMContentLoaded', function() {
    const bookInput = document.getElementById('book_name');
    
    if (bookInput) {
        // Create a div element that will contain the autocomplete items
        const autocompleteContainer = document.createElement('div');
        autocompleteContainer.setAttribute('class', 'autocomplete-items');
        autocompleteContainer.style.display = 'none';
        
        // Append the container as a sibling to the input
        bookInput.parentNode.appendChild(autocompleteContainer);
        
        // Add event listener to input field
        bookInput.addEventListener('input', function() {
            const val = this.value;
            
            // Clear previous autocomplete items
            autocompleteContainer.innerHTML = '';
            
            if (!val) {
                autocompleteContainer.style.display = 'none';
                return false;
            }
            
            // Show suggestions only when user has typed at least 3 characters
            if (val.length > 2) {
                // In a real implementation, you would fetch this from your backend with AJAX
                // For example:
                // fetch('/api/books/search?query=' + val)
                //   .then(response => response.json())
                //   .then(books => {
                //     displayAutocompleteSuggestions(books);
                //   });
                
                // For now, we'll just show the input as a suggestion
                showSuggestion(val);
            } else {
                autocompleteContainer.style.display = 'none';
            }
        });
        
        // Function to display a suggestion
        function showSuggestion(text) {
            autocompleteContainer.style.display = 'block';
            
            const item = document.createElement('div');
            item.innerHTML = '<strong>' + text + '</strong>';
            item.addEventListener('click', function() {
                bookInput.value = text;
                autocompleteContainer.style.display = 'none';
            });
            autocompleteContainer.appendChild(item);
        }
        
        // Function to display multiple suggestions
        function displayAutocompleteSuggestions(books) {
            if (books.length > 0) {
                autocompleteContainer.style.display = 'block';
                
                books.forEach(book => {
                    const item = document.createElement('div');
                    // Highlight the matching part of the text
                    const regex = new RegExp(bookInput.value, 'gi');
                    const highlightedText = book.title.replace(
                        regex, 
                        match => '<strong>' + match + '</strong>'
                    );
                    
                    item.innerHTML = highlightedText;
                    item.addEventListener('click', function() {
                        bookInput.value = book.title;
                        autocompleteContainer.style.display = 'none';
                    });
                    autocompleteContainer.appendChild(item);
                });
            }
        }
        
        // Handle keyboard navigation
        bookInput.addEventListener('keydown', function(e) {
            const items = autocompleteContainer.getElementsByTagName('div');
            if (items.length === 0) return;
            
            // Find the currently active item
            let activeIndex = -1;
            for (let i = 0; i < items.length; i++) {
                if (items[i].classList.contains('autocomplete-active')) {
                    activeIndex = i;
                    break;
                }
            }
            
            // Down arrow
            if (e.keyCode === 40) {
                e.preventDefault();
                // Remove active class from current item
                if (activeIndex > -1) {
                    items[activeIndex].classList.remove('autocomplete-active');
                }
                // Move to next item or wrap to first
                activeIndex = (activeIndex + 1) % items.length;
                items[activeIndex].classList.add('autocomplete-active');
            }
            // Up arrow
            else if (e.keyCode === 38) {
                e.preventDefault();
                // Remove active class from current item
                if (activeIndex > -1) {
                    items[activeIndex].classList.remove('autocomplete-active');
                }
                // Move to previous item or wrap to last
                activeIndex = (activeIndex - 1 + items.length) % items.length;
                items[activeIndex].classList.add('autocomplete-active');
            }
            // Enter key
            else if (e.keyCode === 13 && activeIndex > -1) {
                e.preventDefault();
                bookInput.value = items[activeIndex].textContent;
                autocompleteContainer.style.display = 'none';
            }
        });
        
        // Close the autocomplete list when clicking elsewhere
        document.addEventListener('click', function(e) {
            if (e.target !== bookInput) {
                autocompleteContainer.style.display = 'none';
            }
        });
    }
});

// Add animation to book cards
document.addEventListener('DOMContentLoaded', function() {
    const bookCards = document.querySelectorAll('.book-card');
    
    // Apply staggered animation delay to each card
    bookCards.forEach((card, index) => {
        card.style.animationDelay = (index * 0.1) + 's';
    });
});