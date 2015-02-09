var workerId = Math.random().toString().split(".")[1];

function run(data) {
    // purposefully waste a lot of time to look like working #corporatelife
    for (var index = 0; index < 10000000000; index++) {
        index;
    }

    return data[0] + "," + workerId;
}