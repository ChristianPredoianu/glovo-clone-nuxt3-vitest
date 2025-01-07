type DynamicComponentType = any;

export default function useDynamicComponent(defaultComponent: DynamicComponentType) {
  const currentComponent = ref<DynamicComponentType>(defaultComponent);

  function changeComponent(
    componentName: string,
    componentMap: Record<string, DynamicComponentType>
  ) {
    const component = componentMap[componentName];

    if (component) currentComponent.value = markRaw(component);
  }

  return {
    currentComponent,
    changeComponent,
  };
}
