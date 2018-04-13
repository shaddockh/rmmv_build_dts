# RMMV .d.ts Generator

WIP

This tool attempts to analyze the core RPGMaker MV Javascript library files and generates TypeScript .d.ts type definition files. The strategy is to use a parser to parse the JavaScript and then apply a configuration file of rules on how to map to the d.ts. This allows for re-generating the .d.ts files when updates to the core JavaScript files are released.

## To Run

```
node do_extract <configname>

ie:
node do_extract v1.5.1
```

**configname**
This is a configuration file located under `/config` and named `<configname>.json`. ie: `v1.5.1.json`

### Format

```json
{
    "rootDir": "rmmv_core_files/v1.5.1", // The location of the source files
    "outDir": "dist", // The destination for the d.ts files
    "fixes": "../config/rpgmaker_mv_fixes.json", // Locatiion of special post-processing rules to apply
    // The list of files to process
    "files": [
        "rpg_core.js",
        "rpg_managers.js",
        "rpg_objects.js",
        "rpg_scenes.js",
        "rpg_sprites.js",
        "rpg_windows.js"
    ]
}
```

### Rule file

The rule file is a series of post-processing rules to apply to the generated types when they have been parsed. Look at `rpgmaker_mv_fixes.json` for examples.

The following rules are supported:

*   comment-out - comment out the method
*   remove-extends -
*   set-optional-param - declares that the parameter should be marked as optional with the `?`
*   set-param-type - specifies the type the param should be
*   convert-to-interface - specifies that the definition of the class should be generated as an interface instead of a class
*   rename - renames the parameter or method
*   static-class - marks the class as static
*   static-method - marks the method as static
*   set-member-type - marks the method or property as returning a specified type
*   apply-constructor-comment-to-class - takes the comment above the constructor and moves it to the beginning of the class definition
*   copy-params-to-constructor - copies all of the parameters of the method to the constructor

#### Batches

Rules can use wildcards for the selector, and also specify that a series of different matches have the rule applied to them. See the example for usage.

#### Order

The rules are applied in the order they are defined, so if a prior rule changes something that a subsequent rule uses to match with, such as renaming a method, the subsequent rule needs to match on the new name, not the old name.
