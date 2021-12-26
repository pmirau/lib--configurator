# Configurator

## Usage

- The main files are located in `./(index.js)`
- Example files are located in `./__example__/(index.js)`

## Notes & Thoughts

### Class 'Edge'
Should the condition be saved in the edge or in adjacency-list in the node?
If saved in node: Are edges then still necessary? I could set `node1.addAdjacent(node2)`

### Previous enabled-check

Prior to the use of JsonLogic, isDisabledOn & isEnabledOn where functions, 
which where passed the context and calculated the result as a conditional in its return statement. 

Like the following fe.:

```js
const isDisabledOn = ({ values }) => {
  return values.luckyNumber === 777;
};

const isEnabledOn = ({ values }) => {
  return (values.mantra === 'I am a God' && (values.luckyNumber === 777 || !values.high))
    || (values.thoughts.exit === 'Stay down');
};
```

In `testIfEnabled()` inside the edge instance, the following was returned:
```js
return this.#_isDisabledOn(context) ? false : this.#_isEnabledOn(context);
```

`testIfEnabled()` had the following definition:
```js
/**
* This callback is displayed as part of the Requester class.
* @callback module:configurator/graph/checkConditional
* @param {module:configurator/graph/ConditionalContext} context
* @return {boolean}
  */
```

### Problem: XOR Abzweige
Was mit Entweder-oder Abzweigen? Da sind beide Edges per default nicht aktiv

(Default Path for preview, but with xor junction)

Möglichkeiten:

1. Always a default value
2. flag end-node (write function to traverse an 'invalid'-shortest path (for xor junction)
   1. Oder traversieren bis Node keine Edges mehr hat

Lösung:

Problem als Edge-Case bei den Tests festhalten, aber (noch) nicht lösen. Wenn das Problem
im Betrieb auftauchen sollte, muss der Kunde eben einen Default-Value angeben, oder wir werden
das Problem dann zu dem Zeitpunkt lösen

### Problem: Warenkorb Button soll deaktiviert sein, bis alles konfiguriert ist
Lösung: Da Felder haben ja zB required -> Wenn formIsValid, dann kann man in Warenkorb legen

### Problem: Macht Graph (ie. Abzweigungen) überhaupt Sinn? 
Oder sollte nur ein durchgehender "Strich" mit optionalen Schritten gewählt werden?

### Problem: Valid paths

Only one edge should always be valid. Bc what if a user hits a combination, where there are
two possible paths? Which one do you take? -> Weights/Priority

Or maybe not only one valid. But there should be a distinct single path

### Problem: enabledOn - disabledOn -- Precedence

disabledConditional > enabledConditional -> one method: testIfEnabled(context)

## TODO
- ID in Edges necessary? 
    - Private id etc evtl. öffentlich. Ist für debug interessant (No premature optimization)
