import { Project } from "@atomist/rug/model/Project";

import {
    Given, ProjectScenarioWorld, Then, When,
} from "@atomist/rug/test/project/Core";

const CERTAIN_INPUT_FILEPATH = "src/com/example/package/NotAnnotated.java";

const CERTAIN_FILE_CONTENT_BEFORE = `

package com.example.package;

public class NotAnnotated {

}
`;

const CERTAIN_FILE_CONTENT_AFTER = `
package com.example.package;

import lombok.Builder;

@Builder
public class NotAnnotated {
}
`;

Given("a project with a certain file", (p: Project, world) => {
    p.addFile(CERTAIN_INPUT_FILEPATH, CERTAIN_FILE_CONTENT_BEFORE);
});

When("the AddAnnotationToEveryTypeInPackage is run", (p: Project, world) => {

    const w = world as ProjectScenarioWorld;

    const editor = w.editor("AddAnnotationToEveryTypeInPackage");

    w.editWith(editor, {
        packageOfTypesToAnnotate: "com.example.package",
        annotationPackage: "lombok",
        annotationName: "Builder",
    });
});

Then("that certain file looks different", (p: Project, world) => {
    const w = world as ProjectScenarioWorld;

    const after = p.findFile(CERTAIN_INPUT_FILEPATH).content;

    console.log(after);

    const passing = (after === CERTAIN_FILE_CONTENT_AFTER);

    if (!passing) {
        console.log(`FAILURE: ${CERTAIN_INPUT_FILEPATH} --->\n${after}\n<---`);
    }

    return passing;
});
