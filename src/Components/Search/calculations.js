
/*
  Returns object of classes and their occurrences to use
  in the side bar of the results page next to the graph
 */
export function classList(data){
    let classes = {}; // { className: {count, {year, quarter, code, instructor}} }

    for(let classObject of data){
        let c = classObject.course_offering;
        let className = `${c.course.department} ${c.course.number}`;
        let course = {year: c.year, quarter: c.quarter, code: c.section.code, instructor: c.instructors[0].shortened_name};

        if(className in classes){
            classes[className].count++;
            classes[className].courses.push(course);
        } else {
            classes[className] = {count: 1, courses: [course]};
            classes[className].department = c.course.department
            classes[className].number = c.course.number
        }
    }

    // turns classes object into an array of objects
    return Object.entries(classes).map(([key, value]) => ({
        name: key, count: value.count, courses: value.courses, department: value.department, number: value.number
    }))
}

/*
  Returns object of instructors and their occurrences to use
  in the side bar of the results page next to the graph
 */
export function instructorList(data){
    let instructors = {};

    for(let classObject of data){
        let teacher = classObject.course_offering.instructors[0].shortened_name
        if(teacher in instructors){
            instructors[teacher]++;
        } else {
            instructors[teacher] = 1;
        }
    }

    return Object.entries(instructors).map(([key, value]) => ({
        name: key, count: value
    }))
}

/*
  Returns exact year from a quarter and year combo
  Winter 2017-18 => Winter 2018
 */
export function exactYear(quarter, year){
    let yearSplit = year.split('-');
    let quarterUpper = quarter.toUpperCase()
    let exactYear;
    if(quarterUpper === 'SUMMER' || quarterUpper === 'FALL'){
        exactYear = yearSplit[0]
    } else if(quarterUpper === 'WINTER' || quarterUpper === 'SPRING'){
        exactYear = yearSplit[0][0] + yearSplit[0][1] + yearSplit[1]
    }

    return exactYear
}

/*
  Returns exact quarter and year from the search query
  Winter 2017-18 => Winter 2018
 */
export function quarterYear(quarters, years){
    if(quarters.length === 1 && years.length === 1){
        return {quarter: quarters[0], year: exactYear(quarters[0], years[0])}
    } else if(quarters.length === 1 && years.length === 0){
        return {quarter: quarters[0], year: ''}
    } else if(quarters.length === 0 && years.length === 1){
        return {quarter: '', year: years[0]}
    } else if(quarters.length === 0 && years.length === 0){
        return {quarter: 'All', year: ''}
    } else {
        return {quarter: 'Custom', year: ''}
    }
}

/*
  Adds additional data for each course in the api result
 */
export function addData(data){
    for(let i = 0; i < data.length; i++){
        let quarter = data[i].course_offering.quarter.toUpperCase();
        let year = data[i].course_offering.year;
        data[i].course_offering.exact_year = exactYear(quarter, year);
        data[i].course_offering.quarter = data[i].course_offering.quarter.charAt(0).toUpperCase() +
            data[i].course_offering.quarter.slice(1).toLowerCase(); // all caps to first letter upper case and rest lower case
    }
}

/*
  Sums up the amount of grades in the query and averages the gpa
 */
export function cumulativeData(original_data, data, params){
    let stats = {a: 0, b: 0, c: 0, d: 0, f: 0, p: 0, np: 0, gpa: 0}

    if(!params.excludePNP && !params.covid19 && !params.lowerDiv && !params.upperDiv){ // no advanced options
        let agg = original_data.data.grades.aggregate
        stats.a = agg.sum_grade_a_count;
        stats.b = agg.sum_grade_b_count;
        stats.c = agg.sum_grade_c_count;
        stats.d = agg.sum_grade_d_count;
        stats.f = agg.sum_grade_f_count;
        stats.p = agg.sum_grade_p_count;
        stats.np = agg.sum_grade_np_count;
        stats.gpa = (agg.average_gpa === null) ? 0.00.toFixed(2) : agg.average_gpa.toFixed(2);
    } else { // if at least one advanced option is true
        for(let classObject of data){
            stats.a += classObject.grade_a_count;
            stats.b += classObject.grade_b_count;
            stats.c += classObject.grade_c_count;
            stats.d += classObject.grade_d_count;
            stats.f += classObject.grade_f_count;
            stats.p += classObject.grade_p_count;
            stats.np += classObject.grade_np_count;
            stats.gpa += classObject.average_gpa;
        }
        stats.gpa = (stats.gpa / data.length).toFixed(2)
    }

    return stats;
}

/*
  Filters the api result based on the advanced options in the query
 */
export function filter(data, covid19, lowerDiv, upperDiv){
    let final = [];

    for(let c of data){
        let push = true;
        let co = c.course_offering;

        if(lowerDiv === true && upperDiv === false){
            let num = parseInt(co.course.number.replace(/\D/g, ""));
            if(num >= 100){
                push = false;
            }
        }
        if(upperDiv === true && lowerDiv === false){
            let num = parseInt(co.course.number.replace(/\D/g, ""));
            if(num < 100){
                push = false;
            }
        }
        if (covid19) {
            const covid_quarters = new Set([
                '2019-20 WINTER',
                '2019-20 SPRING',
                '2020-21 SUMMER',
                '2020-21 FALL',
                '2020-21 WINTER',
                '2020-21 SPRING',
                "2021-22 SUMMER"
            ]);

            if (covid_quarters.has(co.year + " " + co.quarter.toUpperCase())) {
                push = false;
            }
        }

        if (push) {
            final.push(c);
        }
    }

    return final
}

/*
    Combines all calculations into one function
 */
export function calculateData(data, params, originalData) {
    addData(data);
    let count = data.length; // total amount of classes in query
    let stats = cumulativeData(originalData, data, params); // object that has grade data
    let displayTerm = quarterYear(params.quarters, params.years); // used to display term in results page above graph

    return {
        count: count, a: stats.a, b: stats.b, c: stats.c, d: stats.d, f: stats.f, p: stats.p, np: stats.np,
        averageGPA: stats.gpa, instructor: params.instructor, quarter: displayTerm.quarter, year: displayTerm.year,
        department: params.department, classNumber: params.classNumber,
        classCode: params.classCode, courseList: data
    };
}

/*
    Constructs variables for GraphQL grade distribution query
*/
export function getQueryVariables(params) {
    let quarters = params.quarters.join(';');
    let years = params.years.join(';');

    return {
        "instructor": params.instructor,
        "quarter": quarters,
        "year": years,
        "department": params.department,
        "number": params.classNumber,
        "code": params.code,
        "excludePNP": params.excludePNP
    }
}