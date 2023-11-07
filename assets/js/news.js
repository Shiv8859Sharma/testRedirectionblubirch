// $(document).ready(function () {
const filterListItems = $(".filter-list-items");
let filterValues = []
let removefilterIcon = $(".remove-filter-item")
function setFitleredElement(text) {
    $('.article').each(function () {
        const articleText = $(this).text().toLowerCase();
        const showArticle = text.length === 0 || typeof text === "string" && articleText.indexOf(text) !== -1 || filterValues.some(value => articleText.indexOf(value.toLowerCase()) !== -1);
        $(this).toggle(showArticle);
    });
}

function updateFilterDisplay() {
    setFitleredElement(filterValues);
    filterListItems.empty();

    if (filterValues.length > 2) {
        const lastTwoElements = filterValues.slice(-2);
        const remainingElementCount = filterValues.length - 2;

        filterListItems.append(`
                <li>
                    <a href="javascript:void(0)">
                        +${remainingElementCount}
                    </a>
                </li>`
        );

        lastTwoElements.forEach(ele => {
            filterListItems.append(createFilterItem(ele));
        });
    } else {
        filterValues.forEach(ele => {
            filterListItems.append(createFilterItem(ele));
        });
    }

}

function createFilterItem(value) {
    return `
        <li>
         <a href="javascript:void(0)">
           ${value}
           <span onclick="handleclick('${value}')" class='remove-filter-item'>
            X
          </span>
        </a>
     </li>
        `;
}

$('.searchInput').click(() => {
    var searchText = $(this).val().toLowerCase();
    if (searchText.length === 0) {
        setFitleredElement(searchText)
    }
})

$('.searchInput').on('keydown', function (e) {
    var searchText = $(this).val().toLowerCase();
    if (e.key === "Enter") {
        setFitleredElement(searchText)
    }
    if (searchText.length === 0) {
        setFitleredElement(searchText)
    }
});


$(".fitler-selection").change((event) => {
    console.log(event.target.value, "::: event.target.value");
    if (filterValues.includes(event.target.value)) return
    filterValues.push(event.target.value)
    updateFilterDisplay()
})

function handleclick(value) {
    filterValues = filterValues.filter(item => item !== value);
    updateFilterDisplay();
}





