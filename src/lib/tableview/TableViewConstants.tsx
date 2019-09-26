import React from 'react';
import {ImageProps, ListRenderItemInfo, SectionListData, ViewStyle} from 'react-native';
import {TitleExtra} from '../Title';
import {EmptyStateProps} from "../EmptyState";
import {DiscloruseIconProps} from "../DisclosureIcon";

export type TableViewSectionListRenderItemInfo<ItemT> = ListRenderItemInfo<ItemT> & {
    section: SectionListData<ItemT>;
}

/**
 * Funções de callback em
 */
export type TableViewRowSectionCallbackFn = (row: TableViewRow, section: TableViewSection) => void;

/**
 * Propriedaddes para determinar o comportamento dos itens com Swipe
 */
export type TableViewSwipeAction = {
    /**
     * O título do botão de ação
     */
    title: string;
    /**
     * A cor de fundo do botão
     */
    color?: 'danger' | 'primary' | 'success' | 'warning';
    /**
     * Ação executada ao acionar o botão
     */
    onPress: TableViewRowSectionCallbackFn;
}

export type TableViewSwipeActions = Array<TableViewSwipeAction>;

/**
 * Propriedades de uma linha/item o table view
 */
export type TableViewRow = {
    /**
     * Identificador único do item dentro da seção
     */
    key: string;
    /**
     * Título do elemento, texto ou componente personalizado
     */
    title: string | JSX.Element;
    /**
     * Subtítulo do elemento, texto, componente personalizado, texto e extra data, Array de texto e extra data
     */
    subtitle?: string | JSX.Element | TitleExtra | Array<TitleExtra>;
    /**
     * Inverte a exibição, faz com que o subtítulo tenha uma apresentação mais importante que o título
     */
    reverse?: boolean;
    /**
     * Permite adicionar um ícone ou imagem à esquerda
     */
    icon?: ImageProps | JSX.Element;
    /**
     * Permite usar ícones grandes
     */
    iconBig?: boolean;
    /**
     * Exibe conteúdo adicional à esquerda, como numero de linha
     */
    left?: string | JSX.Element;
    /**
     * Exibe conteúdo adicional à direita, como contador relacionado ao titulo ou elemento personalizado
     */
    right?: string | JSX.Element;
    /**
     * Quando TRUE, o conteúdo da direita vai dividir o espaço igualmente com o conteúdo principal
     */
    rightFlex?: boolean;
    /**
     * Quando há titulo e subtitulo, permite renderizar os textos com fonte normal, grande
     */
    large?: boolean;
    /**
     * Informa que deve exibir a seta á direita (indicador de navegacao)
     */
    disclosure?: boolean | DiscloruseIconProps;
    /**
     * Informa que o item está selecionado
     */
    selected?: boolean;
    /**
     * Quando TRUE, ignora a seleção sobre o item
     */
    ignoreOnSelect?: boolean;
    onPress?: TableViewRowSectionCallbackFn;
    onLongPress?: TableViewRowSectionCallbackFn;
    /**
     * Ações para o gesto de Seipe (arrastar para a esquerda) no item
     */
    swipeActions?: TableViewSwipeActions;

    /**
     * Permite adicionar uma flag no item
     */
    flag?: 'danger' | 'warning' | 'info' | {
        color: string;
        icon?: ImageProps | 'info' | 'exclamation';
    };

    /**
     * Permite definir os estilos do elemento
     */
    style?: ViewStyle;

    [key: string]: any;
}

/**
 * Ícone de ação no Header
 */
export type TableViewSectionAction = {
    onPress: (section: TableViewSection) => void;
    icon: ImageProps | JSX.Element;
}

export type TableViewSectionHeaderMixed = {
    title: string | JSX.Element;
    subtitle?: string | JSX.Element;
}

export type TableViewSectionHeader = string | TableViewSectionHeaderMixed | JSX.Element;


/**
 * Definição para uma seção da listagem
 */
export type TableViewSection = {
    /**
     * Identificador único da seção
     */
    key: string;
    /**
     * Cabeçalho da seção
     */
    header?: TableViewSectionHeader;
    /**
     * Permite definir o empty state para essa sessão específica.
     *
     * Este EmptyState é exibido quando data é vazio
     */
    emptyState?: EmptyStateProps,

    /**
     * Permite definir os estilos do container da sessao
     */
    style?: ViewStyle;

    /**
     * Exibe conteúdo adicional à direita, como contador relacionado ao titulo, botões de ação ou elemento personalizado
     */
    actions?: JSX.Element | Array<TableViewSectionAction>;
    /**
     * Quando FALSE, não renderiza ultimo separador
     */
    footer?: string | JSX.Element | boolean;
    data: Array<TableViewRow>;
    onPress?: TableViewRowSectionCallbackFn;
    onSelect?: TableViewRowSectionCallbackFn;
    onLongPress?: TableViewRowSectionCallbackFn;
    /**
     * Ações para o gesto de Seipe (arrastar para a esquerda) no item
     */
    swipeActions?: TableViewSwipeActions;

    [key: string]: any;
}
