/////////////////////////////////////////
// DO NOT MODIFY - This was auto-generated by a tool.

/* The window for selecting an item to sell on the shop screen. */
declare class Window_ShopSell extends Window_ItemList {
    constructor(x?, y?, width?, height?);
    initialize(x?, y?, width?, height?);
    isEnabled(item);
}

/* The superclass of all windows within the game. */
declare class Window_Base extends Window {
    constructor(x?, y?, width?, height?);
    static _faceHeight: number;
    static _faceWidth: number;
    static _iconHeight: number;
    static _iconWidth: number;
    activate();
    actorName(n);
    calcTextHeight(textState, all);
    canvasToLocalX(x);
    canvasToLocalY(y);
    changePaintOpacity(enabled);
    changeTextColor(color);
    close();
    contentsHeight();
    contentsWidth();
    convertEscapeCharacters(text);
    createContents();
    crisisColor();
    deactivate();
    deathColor();
    dimColor1();
    dimColor2();
    drawActorCharacter(actor, x, y);
    drawActorClass(actor, x, y, width);
    drawActorFace(actor, x, y, width, height);
    drawActorHp(actor, x, y, width);
    drawActorIcons(actor, x, y, width);
    drawActorLevel(actor, x, y);
    drawActorMp(actor, x, y, width);
    drawActorName(actor, x, y, width);
    drawActorNickname(actor, x, y, width);
    drawActorSimpleStatus(actor, x, y, width);
    drawActorTp(actor, x, y, width);
    drawCharacter(characterName, characterIndex, x, y);
    drawCurrencyValue(value, unit, x, y, width);
    drawCurrentAndMax(current, max, x, y, width, color1, color2);
    drawFace(faceName, faceIndex, x, y, width, height);
    drawGauge(x, y, width, rate, color1, color2);
    drawIcon(iconIndex, x, y);
    drawItemName(item, x, y, width?);
    drawText(text, x, y, maxWidth?, align?);
    drawTextEx(text, x, y);
    fittingHeight(numLines);
    gaugeBackColor();
    hide();
    hideBackgroundDimmer();
    hpColor(actor);
    hpGaugeColor1();
    hpGaugeColor2();
    initialize(x?, y?, width?, height?);
    isClosing();
    isOpening();
    lineHeight();
    loadWindowskin();
    makeFontBigger();
    makeFontSmaller();
    mpColor(actor);
    mpCostColor();
    mpGaugeColor1();
    mpGaugeColor2();
    normalColor();
    obtainEscapeCode(textState);
    obtainEscapeParam(textState);
    open();
    paramchangeTextColor(change);
    partyMemberName(n);
    pendingColor();
    powerDownColor();
    powerUpColor();
    processCharacter(textState);
    processDrawIcon(iconIndex, textState);
    processEscapeCharacter(code, textState);
    processNewLine(textState);
    processNewPage(textState);
    processNormalCharacter(textState);
    refreshDimmerBitmap();
    reserveFaceImages();
    resetFontSettings();
    resetTextColor();
    setBackgroundType(type);
    show();
    showBackgroundDimmer();
    standardBackOpacity();
    standardFontFace();
    standardFontSize();
    standardPadding();
    systemColor();
    textColor(n);
    textPadding();
    textWidth(text);
    tpColor(actor);
    tpCostColor();
    tpGaugeColor1();
    tpGaugeColor2();
    translucentOpacity();
    update();
    updateBackgroundDimmer();
    updateBackOpacity();
    updateClose();
    updateOpen();
    updatePadding();
    updateTone();
}

/* The superclass of windows for selecting a command. */
declare class Window_Command extends Window_Selectable {
    constructor(x?, y?);
    addCommand(name, symbol, enabled, ext);
    callOkHandler();
    clearCommandList();
    commandName(index);
    commandSymbol(index);
    currentData();
    currentExt();
    currentSymbol();
    drawItem(index);
    findExt(ext);
    findSymbol(symbol);
    initialize(x?, y?);
    isCommandEnabled(index);
    isCurrentItemEnabled();
    isOkEnabled();
    itemTextAlign();
    makeCommandList();
    maxItems();
    numVisibleRows();
    refresh();
    selectExt(ext);
    selectSymbol(symbol);
    windowHeight();
    windowWidth();
}

/* The command window for the horizontal selection format. */
declare class Window_HorzCommand extends Window_Command {
    constructor(x?, y?);
    initialize(x?, y?);
    itemTextAlign();
    maxCols();
    numVisibleRows();
}

/* The window for displaying the description of the selected item. */
declare class Window_Help extends Window_Base {
    constructor(numLines?);
    clear();
    initialize(numLines?);
    refresh();
    setItem(item);
    setText(text);
}

/* The window for displaying the party's gold. */
declare class Window_Gold extends Window_Base {
    constructor(x?, y?);
    currencyUnit();
    initialize(x?, y?);
    open();
    refresh();
    value();
    windowHeight();
    windowWidth();
}

/* The window for selecting a command on the menu screen. */
declare class Window_MenuCommand extends Window_Command {
    constructor(x?, y?);
    static _lastCommandSymbol;
    static initCommandPosition();
    addFormationCommand();
    addGameEndCommand();
    addMainCommands();
    addOptionsCommand();
    addOriginalCommands();
    addSaveCommand();
    areMainCommandsEnabled();
    initialize(x?, y?);
    isFormationEnabled();
    isGameEndEnabled();
    isOptionsEnabled();
    isSaveEnabled();
    makeCommandList();
    needsCommand(name);
    numVisibleRows();
    processOk();
    selectLast();
    windowWidth();
}

/* The window for displaying party member status on the menu screen. */
declare class Window_MenuStatus extends Window_Selectable {
    constructor(x?, y?);
    drawItem(index);
    drawItemBackground(index);
    drawItemImage(index);
    drawItemStatus(index);
    formationMode();
    initialize(x?, y?);
    isCurrentItemEnabled();
    itemHeight();
    loadImages();
    maxItems();
    numVisibleRows();
    pendingIndex();
    processOk();
    selectLast();
    setFormationMode(formationMode);
    setPendingIndex(index);
    windowHeight();
    windowWidth();
}

/* The window for selecting a target actor on the item and skill screens. */
declare class Window_MenuActor extends Window_MenuStatus {
    constructor();
    initialize();
    processOk();
    selectForItem(item);
    selectLast();
}

/* The window for selecting a category of items on the item and shop screens. */
declare class Window_ItemCategory extends Window_HorzCommand {
    constructor();
    initialize();
    makeCommandList();
    maxCols();
    setItemWindow(itemWindow);
    update();
    windowWidth();
}

/* The window for selecting an item on the item screen. */
declare class Window_ItemList extends Window_Selectable {
    constructor(x?, y?, width?, height?);
    drawItem(index);
    drawItemNumber(item, x, y, width);
    includes(item);
    initialize(x?, y?, width?, height?);
    isCurrentItemEnabled();
    isEnabled(item);
    item();
    makeItemList();
    maxCols();
    maxItems();
    needsNumber();
    numberWidth();
    refresh();
    selectLast();
    setCategory(category);
    spacing();
    updateHelp();
}

/* The window for selecting a skill type on the skill screen. */
declare class Window_SkillType extends Window_Command {
    constructor(x?, y?);
    initialize(x?, y?);
    makeCommandList();
    numVisibleRows();
    selectLast();
    setActor(actor);
    setSkillWindow(skillWindow);
    update();
    windowWidth();
}

/* The window for displaying the skill user's status on the skill screen. */
declare class Window_SkillStatus extends Window_Base {
    constructor(x?, y?, width?, height?);
    initialize(x?, y?, width?, height?);
    refresh();
    setActor(actor);
}

/* The window for selecting a skill on the skill screen. */
declare class Window_SkillList extends Window_Selectable {
    constructor(x?, y?, width?, height?);
    costWidth();
    drawItem(index);
    drawSkillCost(skill, x, y, width);
    includes(item);
    initialize(x?, y?, width?, height?);
    isCurrentItemEnabled();
    isEnabled(item);
    item();
    makeItemList();
    maxCols();
    maxItems();
    refresh();
    selectLast();
    setActor(actor);
    setStypeId(stypeId);
    spacing();
    updateHelp();
}

/* The window for displaying parameter changes on the equipment screen. */
declare class Window_EquipStatus extends Window_Base {
    constructor(x?, y?);
    drawCurrentParam(x, y, paramId);
    drawItem(x, y, paramId);
    drawNewParam(x, y, paramId);
    drawParamName(x, y, paramId);
    drawRightArrow(x, y);
    initialize(x?, y?);
    numVisibleRows();
    refresh();
    setActor(actor);
    setTempActor(tempActor);
    windowHeight();
    windowWidth();
}

/* The window for selecting a command on the equipment screen. */
declare class Window_EquipCommand extends Window_HorzCommand {
    constructor(x?, y?, width?);
    initialize(x?, y?, width?);
    makeCommandList();
    maxCols();
    windowWidth();
}

/* The window for selecting an equipment slot on the equipment screen. */
declare class Window_EquipSlot extends Window_Selectable {
    constructor(x?, y?, width?, height?);
    drawItem(index);
    initialize(x?, y?, width?, height?);
    isCurrentItemEnabled();
    isEnabled(index);
    item();
    maxItems();
    setActor(actor);
    setItemWindow(itemWindow);
    setStatusWindow(statusWindow);
    slotName(index);
    update();
    updateHelp();
}

/* The window for selecting an equipment item on the equipment screen. */
declare class Window_EquipItem extends Window_ItemList {
    constructor(x?, y?, width?, height?);
    includes(item);
    initialize(x?, y?, width?, height?);
    isEnabled(item);
    playOkSound();
    selectLast();
    setActor(actor);
    setSlotId(slotId);
    setStatusWindow(statusWindow);
    updateHelp();
}

/* The window for displaying full status on the status screen. */
declare class Window_Status extends Window_Selectable {
    constructor();
    drawBasicInfo(x, y);
    drawBlock1(y);
    drawBlock2(y);
    drawBlock3(y);
    drawBlock4(y);
    drawEquipments(x, y);
    drawExpInfo(x, y);
    drawHorzLine(y);
    drawParameters(x, y);
    drawProfile(x, y);
    initialize();
    lineColor();
    maxEquipmentLines();
    refresh();
    setActor(actor);
}

/* The window for changing various settings on the options screen. */
declare class Window_Options extends Window_Command {
    constructor();
    addGeneralOptions();
    addVolumeOptions();
    booleanStatusText(value);
    changeValue(symbol, value);
    cursorLeft(wrap);
    cursorRight(wrap);
    drawItem(index);
    getConfigValue(symbol);
    initialize();
    isVolumeSymbol(symbol);
    makeCommandList();
    processOk();
    setConfigValue(symbol, volume);
    statusText(index);
    statusWidth();
    updatePlacement();
    volumeOffset();
    volumeStatusText(value);
    windowHeight();
    windowWidth();
}

/* The window for selecting a save file on the save and load screens. */
declare class Window_SavefileList extends Window_Selectable {
    constructor(x?, y?, width?, height?);
    drawContents(info, rect, valid);
    drawFileId(id, x, y);
    drawGameTitle(info, x, y, width);
    drawItem(index);
    drawPartyCharacters(info, x, y);
    drawPlaytime(info, x, y, width);
    initialize(x?, y?, width?, height?);
    itemHeight();
    maxItems();
    maxVisibleItems();
    playOkSound();
    setMode(mode);
}

/* The window for selecting buy/sell on the shop screen. */
declare class Window_ShopCommand extends Window_HorzCommand {
    constructor(width?, purchaseOnly?);
    initialize(width?, purchaseOnly?);
    makeCommandList();
    maxCols();
    windowWidth();
}

/* The window for selecting an item to buy on the shop screen. */
declare class Window_ShopBuy extends Window_Selectable {
    constructor(x?, y?, height?, shopGoods?);
    drawItem(index);
    initialize(x?, y?, height?, shopGoods?);
    isCurrentItemEnabled();
    isEnabled(item);
    item();
    makeItemList();
    maxItems();
    price(item);
    refresh();
    setMoney(money);
    setStatusWindow(statusWindow);
    updateHelp();
    windowWidth();
}

/* The window class with cursor movement and scroll functions. */
declare class Window_Selectable extends Window_Base {
    constructor(x?, y?, width?, height?);
    activate();
    bottomRow();
    callCancelHandler();
    callHandler(symbol);
    callOkHandler();
    callUpdateHelp();
    clearItem(index);
    cursorAll();
    cursorDown(wrap);
    cursorFixed();
    cursorLeft(wrap);
    cursorPagedown();
    cursorPageup();
    cursorRight(wrap);
    cursorUp(wrap);
    deactivate();
    deselect();
    drawAllItems();
    drawItem(index);
    ensureCursorVisible();
    hideHelpWindow();
    hitTest(x, y);
    index();
    initialize(x?, y?, width?, height?);
    isCancelEnabled();
    isCancelTriggered();
    isContentsArea(x, y);
    isCurrentItemEnabled();
    isCursorMovable();
    isCursorVisible();
    isHandled(symbol);
    isHorizontal();
    isOkEnabled();
    isOkTriggered();
    isOpenAndActive();
    isTouchedInsideFrame();
    isTouchOkEnabled();
    itemHeight();
    itemRect(index);
    itemRectForText(index);
    itemWidth();
    maxCols();
    maxItems();
    maxPageItems();
    maxPageRows();
    maxRows();
    maxTopRow();
    onTouch(triggered);
    playBuzzerSound();
    playOkSound();
    processCancel();
    processCursorMove();
    processHandling();
    processOk();
    processPagedown();
    processPageup();
    processTouch();
    processWheel();
    redrawCurrentItem();
    redrawItem(index);
    refresh();
    reselect();
    resetScroll();
    row();
    scrollDown();
    scrollUp();
    select(index);
    setBottomRow(row);
    setCursorAll(cursorAll);
    setCursorFixed(cursorFixed);
    setHandler(symbol, method);
    setHelpWindow(helpWindow);
    setHelpWindowItem(item);
    setTopRow(row);
    showHelpWindow();
    spacing();
    topIndex();
    topRow();
    update();
    updateArrows();
    updateCursor();
    updateHelp();
    updateInputData();
}

/* screen. */
declare class Window_ShopNumber extends Window_Selectable {
    constructor(x?, y?, height?);
    buttonY();
    changeNumber(amount);
    createButtons();
    cursorWidth();
    cursorX();
    drawMultiplicationSign();
    drawNumber();
    drawTotalPrice();
    hideButtons();
    initialize(x?, y?, height?);
    isOkTriggered();
    itemY();
    maxDigits();
    number();
    onButtonDown();
    onButtonDown2();
    onButtonOk();
    onButtonUp();
    onButtonUp2();
    placeButtons();
    playOkSound();
    priceY();
    processNumberChange();
    refresh();
    setCurrencyUnit(currencyUnit);
    setup(item, max, price);
    showButtons();
    update();
    updateButtonsVisiblity();
    updateCursor();
    windowWidth();
}

/* equipment on the shop screen. */
declare class Window_ShopStatus extends Window_Base {
    constructor(x?, y?, width?, height?);
    changePage();
    currentEquippedItem(actor, etypeId);
    drawActorEquipInfo(x, y, actor);
    drawActorParamChange(x, y, actor, item1);
    drawEquipInfo(x, y);
    drawPossession(x, y);
    initialize(x?, y?, width?, height?);
    isEquipItem();
    isPageChangeEnabled();
    isPageChangeRequested();
    isTouchedInsideFrame();
    maxPages();
    pageSize();
    paramId();
    refresh();
    setItem(item);
    statusMembers();
    update();
    updatePage();
}

/* The window for editing an actor's name on the name input screen. */
declare class Window_NameEdit extends Window_Base {
    constructor(actor?, maxLength?);

    /* null//FIXME: name is a function here, but variable in parent class */
    //name();
    add(ch);
    back();
    charWidth();
    drawChar(index);
    drawUnderline(index);
    faceWidth();
    initialize(actor?, maxLength?);
    itemRect(index);
    left();
    refresh();
    restoreDefault();
    underlineColor();
    underlineRect(index);
    windowHeight();
    windowWidth();
}

/* The window for selecting text characters on the name input screen. */
declare class Window_NameInput extends Window_Selectable {
    constructor(editWindow?);
    static JAPAN1: string;
    static JAPAN2: string;
    static JAPAN3: string;
    static LATIN1: string;
    static LATIN2: string;
    static RUSSIA: string;
    character();
    cursorDown(wrap);
    cursorLeft(wrap);
    cursorPagedown();
    cursorPageup();
    cursorRight(wrap);
    cursorUp(wrap);
    initialize(editWindow?);
    isCancelEnabled();
    isCursorMovable();
    isOk();
    isPageChange();
    itemRect(index);
    maxCols();
    maxItems();
    onNameAdd();
    onNameOk();
    processBack();
    processCancel();
    processCursorMove();
    processHandling();
    processJump();
    processOk();
    refresh();
    table();
    updateCursor();
    windowHeight();
}

/* The window used for the event command [Show Choices]. */
declare class Window_ChoiceList extends Window_Command {
    constructor(messageWindow?);
    callCancelHandler();
    callOkHandler();
    contentsHeight();
    drawItem(index);
    initialize(messageWindow?);
    isCancelEnabled();
    isOkTriggered();
    makeCommandList();
    maxChoiceWidth();
    numVisibleRows();
    selectDefault();
    start();
    textWidthEx(text);
    updateBackground();
    updatePlacement();
    windowWidth();
}

/* The window used for the event command [Input Number]. */
declare class Window_NumberInput extends Window_Selectable {
    constructor(messageWindow?);
    buttonY();
    changeDigit(up);
    createButtons();
    drawItem(index);
    hideButtons();
    initialize(messageWindow?);
    isCancelEnabled();
    isOkEnabled();
    isOkTriggered();
    isTouchOkEnabled();
    itemWidth();
    maxCols();
    maxItems();
    onButtonDown();
    onButtonOk();
    onButtonUp();
    placeButtons();
    processDigitChange();
    processOk();
    showButtons();
    spacing();
    start();
    update();
    updateButtonsVisiblity();
    updatePlacement();
    windowHeight();
    windowWidth();
}

/* The window used for the event command [Select Item]. */
declare class Window_EventItem extends Window_ItemList {
    constructor(messageWindow?);
    includes(item);
    initialize(messageWindow?);
    isEnabled(item);
    numVisibleRows();
    onCancel();
    onOk();
    start();
    updatePlacement();
    windowHeight();
}

/* The window for displaying text messages. */
declare class Window_Message extends Window_Base {
    constructor();
    areSettingsChanged();
    canStart();
    checkToNotClose();
    clearFlags();
    createSubWindows();
    doesContinue();
    drawMessageFace();
    initialize();
    initMembers();
    isAnySubWindowActive();
    isEndOfText(textState);
    isTriggered();
    loadMessageFace();
    needsNewPage(textState);
    newLineX();
    newPage(textState);
    numVisibleRows();
    onEndOfText();
    processEscapeCharacter(code, textState);
    processNewLine(textState);
    processNewPage(textState);
    startInput();
    startMessage();
    startPause();
    startWait(count);
    subWindows();
    terminateMessage();
    update();
    updateBackground();
    updateInput();
    updateLoading();
    updateMessage();
    updatePlacement();
    updateShowFast();
    updateWait();
    windowHeight();
    windowWidth();
}

/* is handled as a window for convenience. */
declare class Window_ScrollText extends Window_Base {
    constructor();
    contentsHeight();
    fastForwardRate();
    initialize();
    isFastForward();
    refresh();
    scrollSpeed();
    startMessage();
    terminateMessage();
    update();
    updateMessage();
}

/* The window for displaying the map name on the map screen. */
declare class Window_MapName extends Window_Base {
    constructor();
    close();
    drawBackground(x, y, width, height);
    initialize();
    open();
    refresh();
    update();
    updateFadeIn();
    updateFadeOut();
    windowHeight();
    windowWidth();
}

/* handled as a window for convenience. */
declare class Window_BattleLog extends Window_Selectable {
    constructor();
    addText(text);
    animationBaseDelay();
    animationNextDelay();
    backColor();
    backPaintOpacity();
    backRect();
    callNextMethod();
    clear();
    createBackBitmap();
    createBackSprite();
    displayAction(subject, item);
    displayActionResults(subject, target);
    displayAddedStates(target);
    displayAffectedStatus(target);
    displayAutoAffectedStatus(target);
    displayBuffs(target, buffs, fmt);
    displayChangedBuffs(target);
    displayChangedStates(target);
    displayCounter(target);
    displayCritical(target);
    displayCurrentState(subject);
    displayDamage(target);
    displayEvasion(target);
    displayFailure(target);
    displayHpDamage(target);
    displayMiss(target);
    displayMpDamage(target);
    displayReflection(target);
    displayRegeneration(subject);
    displayRemovedStates(target);
    displaySubstitute(substitute, target);
    displayTpDamage(target);
    drawBackground();
    drawLineText(index);
    endAction(subject);
    initialize();
    isBusy();
    isFastForward();
    makeHpDamageText(target);
    makeMpDamageText(target);
    makeTpDamageText(target);
    maxLines();
    messageSpeed();
    numLines();
    performAction(subject, action);
    performActionEnd(subject);
    performActionStart(subject, action);
    performCollapse(target);
    performCounter(target);
    performDamage(target);
    performEvasion(target);
    performMagicEvasion(target);
    performMiss(target);
    performRecovery(target);
    performReflection(target);
    performSubstitute(substitute, target);
    popBaseLine();
    popupDamage(target);
    push(methodName);
    pushBaseLine();
    refresh();
    setSpriteset(spriteset);
    setWaitMode(waitMode);
    showActorAttackAnimation(subject, targets);
    showAnimation(subject, targets, animationId);
    showAttackAnimation(subject, targets);
    showEnemyAttackAnimation(subject, targets);
    showNormalAnimation(targets, animationId, mirror);
    startAction(subject, action, targets);
    startTurn();
    update();
    updateWait();
    updateWaitCount();
    updateWaitMode();
    wait();
    waitForEffect();
    waitForMovement();
    waitForNewLine();
    windowHeight();
    windowWidth();
}

/* The window for selecting whether to fight or escape on the battle screen. */
declare class Window_PartyCommand extends Window_Command {
    constructor();
    initialize();
    makeCommandList();
    numVisibleRows();
    setup();
    windowWidth();
}

/* The window for selecting an actor's action on the battle screen. */
declare class Window_ActorCommand extends Window_Command {
    constructor();
    addAttackCommand();
    addGuardCommand();
    addItemCommand();
    addSkillCommands();
    initialize();
    makeCommandList();
    numVisibleRows();
    processOk();
    selectLast();
    setup(actor);
    windowWidth();
}

/* The window for displaying the status of party members on the battle screen. */
declare class Window_BattleStatus extends Window_Selectable {
    constructor();
    basicAreaRect(index);
    drawBasicArea(rect, actor);
    drawGaugeArea(rect, actor);
    drawGaugeAreaWithoutTp(rect, actor);
    drawGaugeAreaWithTp(rect, actor);
    drawItem(index);
    gaugeAreaRect(index);
    gaugeAreaWidth();
    initialize();
    maxItems();
    numVisibleRows();
    refresh();
    windowHeight();
    windowWidth();
}

/* The window for selecting a target actor on the battle screen. */
declare class Window_BattleActor extends Window_BattleStatus {
    constructor(x?, y?);
    actor();
    hide();
    initialize(x?, y?);
    select(index);
    show();
}

/* The window for selecting a target enemy on the battle screen. */
declare class Window_BattleEnemy extends Window_Selectable {
    constructor(x?, y?);
    drawItem(index);
    enemy();
    enemyIndex();
    hide();
    initialize(x?, y?);
    maxCols();
    maxItems();
    numVisibleRows();
    refresh();
    select(index);
    show();
    windowHeight();
    windowWidth();
}

/* The window for selecting a skill to use on the battle screen. */
declare class Window_BattleSkill extends Window_SkillList {
    constructor(x?, y?, width?, height?);
    hide();
    initialize(x?, y?, width?, height?);
    show();
}

/* The window for selecting an item to use on the battle screen. */
declare class Window_BattleItem extends Window_ItemList {
    constructor(x?, y?, width?, height?);
    hide();
    includes(item);
    initialize(x?, y?, width?, height?);
    show();
}

/* The window for selecting New Game/Continue on the title screen. */
declare class Window_TitleCommand extends Window_Command {
    constructor();
    static _lastCommandSymbol;
    static initCommandPosition();
    initialize();
    isContinueEnabled();
    makeCommandList();
    processOk();
    selectLast();
    updatePlacement();
    windowWidth();
}

/* The window for selecting "Go to Title" on the game end screen. */
declare class Window_GameEnd extends Window_Command {
    constructor();
    initialize();
    makeCommandList();
    updatePlacement();
    windowWidth();
}

/* The window for selecting a block of switches/variables on the debug screen. */
declare class Window_DebugRange extends Window_Selectable {
    constructor(x?, y?);
    static lastIndex: number;
    static lastTopRow: number;
    drawItem(index);
    initialize(x?, y?);
    isCancelTriggered();
    maxItems();
    mode();
    processCancel();
    refresh();
    setEditWindow(editWindow);
    topId();
    update();
    windowHeight();
    windowWidth();
}

/* The window for displaying switches and variables on the debug screen. */
declare class Window_DebugEdit extends Window_Selectable {
    constructor(x?, y?, width?);
    currentId();
    drawItem(index);
    initialize(x?, y?, width?);
    itemName(dataId);
    itemStatus(dataId);
    maxItems();
    refresh();
    setMode(mode);
    setTopId(id);
    update();
    updateSwitch();
    updateVariable();
}
