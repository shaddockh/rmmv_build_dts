# RMMV .d.ts Generator

WIP

This tool attempts to analyze the core RPGMaker MV Javascript library files and generates TypeScript .d.ts type definition files. The strategy is to use a parser to parse the JavaScript and then apply a configuration file of rules on how to map to the d.ts. This allows for re-generating the .d.ts files when updates to the core JavaScript files are released.

## To Run

```
node do_extract
```
