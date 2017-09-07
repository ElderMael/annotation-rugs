import {Project} from "@atomist/rug/model/Core";
import {Editor, Parameter, Tags} from "@atomist/rug/operations/Decorators";
import {EditProject} from "@atomist/rug/operations/ProjectEditor";
import {Pattern} from "@atomist/rug/operations/RugOperation";
import {PathExpressionEngine} from "@atomist/rug/tree/PathExpression";
import {JavaSource} from "@atomist/rug/model/JavaSource";
import {JavaType} from "@atomist/rug/model/JavaType";


@Tags("documentation")
@Editor("AddAnnotationToEveryTypeInPackage", "a Rug that will add an annotation to all Java Types in a package")
export class AddAnnotationToEveryTypeInPackage implements EditProject {

    @Parameter({
        displayName: "The Package Containing The Types To Annotate",
        description: "the package of the types you want to annotate",
        pattern: Pattern.any,
        validInput: "com.example.dtos",
        minLength: 1,
        maxLength: 100,
    })
    public packageOfTypesToAnnotate: string;

    @Parameter({
        displayName: "Annotation Package",
        description: "the annotation package that you want to add to your type",
        pattern: Pattern.any,
        validInput: "lombok",
        minLength: 1,
        maxLength: 100,
    })
    public annotationPackage: string;

    @Parameter({
        displayName: "Annotation Name",
        description: "the annotation that you want to add to your type",
        pattern: Pattern.any,
        validInput: "Builder",
        minLength: 1,
        maxLength: 100,
    })
    public annotationName: string;


    public edit(project: Project) {

        const eng: PathExpressionEngine = project.context.pathExpressionEngine;

        eng.with<JavaSource>(project,
            `//JavaSource()[.pkg()='${ this.packageOfTypesToAnnotate }']`,
            javaSourceCode => {

                eng.with<JavaType>(javaSourceCode, '//JavaType()', javaType => {
                    javaType.addAnnotation(this.annotationPackage, this.annotationName)
                });

            });

    }
}

export const addAnnotationToEveryTypeInPackage = new AddAnnotationToEveryTypeInPackage();
