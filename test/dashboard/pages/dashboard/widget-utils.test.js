import { findDisplayPlacement } from "../../../../src/dashboard/pages/dashboard/widget-util";

test('Finds first open slot in the grid', () => {

    const widgets = [
    ]

    let newPlacement = findDisplayPlacement(widgets);

    console.log(newPlacement)
    expect(newPlacement).toStrictEqual({x: 0, y: 0})

    widgets.push({
      widgetId: '@hub/project-info',
      display: {x: 0, y: 0}
    })

    newPlacement = findDisplayPlacement(widgets);

    console.log(newPlacement)
    expect(newPlacement).toStrictEqual({x: 1, y: 0})

    widgets.push({
      widgetId: '@hub/links',
      display: {x: 1, y: 0}
    });

    widgets.push({
      widgetId: '@hub/resources',
      display: {x: 2, y: 0}
    })

    newPlacement = findDisplayPlacement(widgets);

    console.log(newPlacement)
    expect(newPlacement).toStrictEqual({x: 0, y: 1})

    widgets.push({
        widgetId: '@hub/repos',
        display: {x: 0, y: 1}
    })

    widgets.push({
        widgetId: '@hub/repos',
        display: {x: 2, y: 1}
    })

    newPlacement = findDisplayPlacement(widgets);

    console.log(newPlacement)
    expect(newPlacement).toStrictEqual({x: 1, y: 1})
});